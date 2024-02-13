import pymysql, os

class VideoDao:

    # convert_s3_path 값 저장 및 기본키 반환
    def update_video_s3_path(self, connection, convert_s3_path):
        cursor = connection.cursor()
        cursor.execute('INSERT INTO videos (convert_s3_path) VALUES (%s)', (convert_s3_path,))
        connection.commit()
        video_id = cursor.lastrowid  # 기본 키 값을 반환
        cursor.close()
        return video_id

    # video_id에 해당하는 레코드(행)의 original_path를 삭제
    def delete_original_video_s3_path(self, connection, video_id):
        cursor = connection.cursor()
        cursor.execute('UPDATE videos SET original_s3_path = NULL WHERE id = %s', video_id)
        connection.commit()
        cursor.close()