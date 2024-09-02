import whisper

def stt(local_audio_path):

    try:
        model = whisper.load_model("medium")
        sentence_result = model.transcribe(local_audio_path)
        sentencelevel_info = []

        # Whisper로 추출한 text에서 문장과 timestamp만 추출
        for each in sentence_result['segments'][1:]:
            # print (word['word'], "  ",word['start']," - ",word['end'])
            sentencelevel_info.append({'text': each['text'], 'start': each['start'], 'end': each['end']})

        return {'success': True, 'data': sentencelevel_info}

    except Exception as e:
        # 예외 발생 시 로그를 출력하고 예외를 다시 발생시키지 않음
        return {'success': False}