from celery import Celery
import os, boto3, tempfile, shutil, jsonify, subprocess, re
from dotenv import load_dotenv
from moviepy.editor import VideoFileClip, AudioFileClip

# import whisper, json


load_dotenv()

AWS_DEFAULT_REGION = os.environ.get('AWS_DEFAULT_REGION')
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
S3_BUCKET = os.environ.get('S3_BUCKET')

celery = Celery('FlaskAiModelServing', broker='redis://127.0.0.1:6379/0', backend='redis://127.0.0.1:6379/0')


@celery.task
def process_uploaded_file(s3_url, RVC_model):
    # S3
    """
    body 부분에 아래 형식으로 메시지 전송
    {
        "action": "translate",
        "url": "S3 경로" # 버킷 경로X -> 폴더/파일 이름.wav("original_video/ojtube.wav")
    }
    """

    # RVC
    """
    body 부분에 아래 형식으로 메시지 전송
    {
        "url": "original_video/ojtube.wav"

    }
    """

    result = []

    # s3 연결 및 객체 생성
    s3 = s3_connection()

    # 임시 디렉토리에 파일 저장
    with tempfile.TemporaryDirectory() as temp_dir:
        # 동영상 파일명 추출
        original_filename = os.path.basename(s3_url)

        # 동영상을 저장할 경로 설정
        local_video_path = os.path.join(temp_dir, original_filename)

        # 다운로드
        if s3_get_object(s3, S3_BUCKET, s3_url, local_video_path):

            result.append("파일 다운 성공")
        else:
            result.append("파일 다운 실패")

        # 음성 추출
        local_audio_path = extract_audio(temp_dir, local_video_path)

        # Whisper STT로 문장 단위 자막 JSON 파일 생성(subtitle = JSON 형식 자막 파일 경로)
        subtitle = STT(local_audio_path, temp_dir)

        # RVC 변환(return 변환 음성 저장 경로)
        # convert_voice_path = execute_voice_conversion(RVC_model, local_audio_path)
        convert_voice_path = local_audio_path

        # 원본 영상 + 변환 음성
        # convert_video_path = merge_video_audio(temp_dir, local_video_path, convert_voice_path)
        convert_video_path = local_video_path

        # 최종 변환 파일 이름 추출
        convert_voice_name = os.path.basename(convert_video_path)

        # s3 업로드
        convert_video_path_s3 = "convert_voice/" + convert_voice_name # 저장할 S3 경로
        if s3_put_object(s3, S3_BUCKET, convert_voice_path, convert_video_path_s3):
            result.append("파일 업로드 성공")
        else:
            result.append("파일 업로드 실패")

        # 임시 디렉토리 삭제(원본 동영상 및 추출 음성 삭제)
        shutil.rmtree(temp_dir)

        # 임시 디렉토리 삭제 되었는지 확인
        if os.path.exists(local_video_path) and os.path.exists(local_audio_path):

            result.append("임시 디렉토리에 파일이 여전히 존재합니다")
        else:
            result.append("임시 디렉토리의 파일이 삭제되었습니다.")

    # 음성 변환 영상 s3 경로와 문장 단위 JSON 파일 return
    return convert_video_path_s3, subtitle


# 강의 영상에서 음성 추출
@celery.task
def extract_audio(temp_dir, file_path):
    # 동영상 파일 로드
    video_clip = VideoFileClip(file_path)

    # 오디오 추출
    audio_clip = video_clip.audio

    # 파일명 추출
    file_name = os.path.splitext(os.path.basename(file_path))[0] # splitext : 파일의 확장자를 분리해서 저장하기 위함

    # 오피오 파일 경로 설정
    output_audio_path = os.path.join(temp_dir, f'{file_name}_audio.wav')

    # 오디오를 WAV 파일로 저장
    audio_clip.write_audiofile(output_audio_path, codec='pcm_s16le', fps=audio_clip.fps)

    # 메모리에서 오디오 클립 제거
    audio_clip.close()

    return output_audio_path


# 원본 영상 + 변환 음성
@celery.task
def merge_video_audio(temp_dir, video_path, audio_path):
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)

    # 영상에 음성 추가
    video_clip = video_clip.set_audio(audio_clip)

    # 파일명 추출
    file_name = os.path.splitext(os.path.basename(video_path))[0]  # splitext : 파일의 확장자를 분리해서 저장하기 위함

    # 최종 영상 저장 경로 설정
    output_path = os.path.join(temp_dir, f'{file_name}_video.mp4')

    # 새로운 파일로 저장(.mp4)
    video_clip.write_videofile(output_path, codec="libx264", audio_codec="aac", ffmpeg_params=["-preset", "ultrafast"])

    return output_path


# S3 연결 및 S3 객체 반환
@celery.task
def s3_connection():
    """
    s3 bucket에 연결
    :return: 연결된 s3 객체
    """
    try:
        s3 = boto3.client(
            service_name='s3',
            region_name=AWS_DEFAULT_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )
        print("S3 bucket connected!")
        return s3
    except Exception as e:
        print(e)
        raise


@celery.task
# S3에서 파일 다운로드
def s3_get_object(s3, bucket, s3_filepath, local_filepath):
    """
    s3 bucket에서 지정 파일 다운로드
    s3: 연결된 s3 객체(boto3 client)
    bucket: 버킷명
    s3_filepath: 다운 받을 파일의 s3 경로(파일 이름까지)
    local_filepath: 파일이 저장될 local 경로(파일 이름까지)
    성공 시 True, 실패 시 False 반환
    """
    try:
        s3.download_file(bucket, s3_filepath, local_filepath)
        print("s3 file download")
        return True
    except Exception as e:
        print(e)
        return False


# S3에 파일 업로드
@celery.task
def s3_put_object(s3, bucket, local_filepath, s3_filepath):
    """
    s3 bucket에 지정 파일 업로드
    s3: 연결된 s3 객체(boto3 client)
    bucket: 버킷명
    local_filepath: 업로드 할 파일의 local 경로(파일 이름까지)
    s3_filepath: 파일을 업로드 할 s3 경로(파일 이름까지)
    성공 시 True, 실패 시 False 반환
    """
    try:
        s3.upload_file(local_filepath, bucket, s3_filepath)
        print("s3 file upload")
    except Exception as e:
        print(e)
        return False
    return True

# 강의 영상에서 음성 추출
@celery.task
def extract_audio(temp_dir, file_path):
    # 동영상 파일 로드
    video_clip = VideoFileClip(file_path)

    # 오디오 추출
    audio_clip = video_clip.audio

    # 파일명 추출
    file_name = os.path.splitext(os.path.basename(file_path))[0] # splitext : 파일의 확장자를 분리해서 저장하기 위함

    # 오피오 파일 경로 설정
    output_audio_path = os.path.join(temp_dir, f'{file_name}_audio.wav')

    # 오디오를 WAV 파일로 저장
    audio_clip.write_audiofile(output_audio_path, codec='pcm_s16le', fps=audio_clip.fps)

    # 메모리에서 오디오 클립 제거
    audio_clip.close()

    return output_audio_path


@celery.task
def execute_voice_conversion(model_name, local_file_dir):
    # 설정값을 사용하여 명령어 생성
    command = [
        "python3",
        "RVC_custom/src/main.py",
        "-i", local_file_dir,
        "-dir", model_name,
        "-p", "0",
        "-pall", "0",
        "-ir", "0.75",
        "-fr", "3",
        "-rms", "0.25",
        "-palgo", "rmvpe",
        "-hop", "64",
        "-pro", "0.33",
        "-mv", "0",
        "-bv", "0",
        "-iv", "0",
        "-rsize", "0.15",
        "-rwet", "0.2",
        "-rdry", "0.8",
        "-rdamp", "0.7",
        "-oformat", "wav"
    ]
    # 명령어 실행
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
    # 명령어 실행 결과 반환
    # output = ""
    cover_path = ""
    for line in process.stdout:
        # 정규식을 사용하여 파일 경로 추출
        match = re.search(r'Cover generated at (.+)', line)
        if match:
            cover_path = match.group(1).strip()

    process.wait()

    return cover_path

@celery.task
def STT(local_audio_path, tmp_path):
    model = whisper.load_model("medium")
    sentence_result = model.transcribe(local_audio_path)

    # Whisper로 추출한 text에서 문장과 timestamp만 추출
    for each in sentence_result['segments'][1:]:
        # print (word['word'], "  ",word['start']," - ",word['end'])
        sentencelevel_info.append({'text': each['text'], 'start': each['start'], 'end': each['end']})

    # 위에서 추출한 sentencelevel_info를 JSON 파일로 만들기
    subtitle = os.path.join(tmp_path, 'temp_sentence.json')
    with open(subtitle, 'w') as f:
        json.dump(sentencelevel_info, f, indent=4)

    return subtitle