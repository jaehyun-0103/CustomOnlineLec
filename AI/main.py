from flask import Flask, request
from tasks import process_uploaded_file
from AI.DB.config import DB
from AI.DB.connection import get_connection
from dao.dao import VideoDao
# swagger
from flask_restx import Api, Resource, fields


app = Flask(__name__)

# DAO 객체 생성
video_dao = VideoDao()

# swagger
api = Api(app, version='1.0', title='Flask API 문서', description='Swagger 문서', doc="/api-docs")

# 네임스페이스 생성과 동시에 등록(flask_restx)
ai_serving_api = api.namespace('convert', description='음성 변환 API')

upload_model = api.model('UploadModel', {
    'video_id': fields.Integer(required=True, description='사용자 ID', help='사용자 ID는 필수'),
    'url': fields.String(required=True, description='S3 경로', help='S3 경로는 필수'),
    'RVC_model': fields.String(required=True, description='rvc 모델 이름', help='모델 이름은 필수')
})

@ai_serving_api.route('')
class ConvertVoice(Resource):
    @ai_serving_api.expect(upload_model)
    def post(self):
        """
        body 메시지 예시
        {
            "url": "original_video/ojtube.wav",
            "RVC_model": "Elonmusk"
        }
        """
        try:
            # json_data = request.json
            original_video_s3_path = request.json['url']
            RVC_model = request.json['RVC_model']

            # celery 비동기 처리
            result  = process_uploaded_file.delay(original_video_s3_path, RVC_model).get()
            convert_file_path_s3, subtitle = result

            # Spring에서 보낸 Video 테이블의 id
            video_id = request.json['video_id']

            # DB와 연결
            connection = get_connection(DB)

            # video_id에 해당하는 레코드에 convert_file_path_s3, subtitle 저장
            video_dao.update_video_s3_path(connection, video_id, convert_file_path_s3, subtitle)

            # DB와 연결 해제
            connection.close()

            return '', 200


        except ValueError:
            # 잘못된 요청일 경우 HTTP 상태 코드 400 반환
            return {'error': 'Bad Request'}, 400

        except Exception as e:
            # 서버에서 오류가 발생한 경우 HTTP 상태 코드 500과 오류 메시지 반환
            return {'error': str(e)}, 500


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)