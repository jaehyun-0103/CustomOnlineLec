import pymysql, os

class VideoDao:

    # video_id에 해당하는 레코드(행)에 convert_s3_path 값 저장
    def update_video_s3_path(self, connection, video_id, convert_s3_path):
        cursor = connection.cursor()
        cursor.execute('UPDATE videos SET convert_s3_path = %s WHERE id = %s', (convert_s3_path, video_id))
        connection.commit()
        cursor.close()

    # video_id에 해당하는 레코드(행)의 original_path를 삭제
    def delete_original_video_s3_path(self, connection, video_id):
        cursor = connection.cursor()
        cursor.execute('UPDATE videos SET original_s3_path = NULL WHERE id = %s', video_id)
        connection.commit()
        cursor.close()