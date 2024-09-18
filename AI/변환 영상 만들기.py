from moviepy.editor import VideoFileClip, AudioFileClip

# 입력 비디오 파일과 오디오 파일 경로
video_input_path = "세정.mp4"
audio_input_path = "세정_extract_audio_iu_p0_i0.75_fr3_rms0.25_pro0.33_rmvpe.wav"

# 비디오 파일과 오디오 파일 로드
video_clip = VideoFileClip(video_input_path)
audio_clip = AudioFileClip(audio_input_path)

# 오디오 클립의 길이를 비디오 클립의 길이와 맞추기
# 비디오 길이보다 긴 오디오가 있다면, 오디오를 자릅니다.
# if audio_clip.duration > video_clip.duration:
#     audio_clip = audio_clip.subclip(0, video_clip.duration)

# 비디오에 새로운 오디오 추가
video_with_new_audio = video_clip.set_audio(audio_clip)

# 출력 파일 경로
output_path = "세정_iu_output_video.mp4"

# 비디오를 새 오디오와 함께 저장
video_with_new_audio.write_videofile(output_path, codec="libx264", audio_codec="aac", ffmpeg_params=["-preset", "ultrafast"])

# 클립 닫기
video_clip.close()
audio_clip.close()

print(f"비디오 파일이 {output_path}로 저장되었습니다.")
