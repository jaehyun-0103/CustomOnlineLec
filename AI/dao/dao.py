import pymysql, os

class VideoDao:

    # convert_s3_path 값 저장 및 기본키 반환
    def update_video_s3_path(self, connection, date, userId):
        cursor = connection.cursor()
        cursor.execute('INSERT INTO videos (date, userId) VALUES (%s, %s)', (date, userId))
        connection.commit()
        video_id = cursor.lastrowid  # 기본 키 값을 반환
        cursor.close()
        return video_id


    def add_convert_s3_path(self, connection, video_id, convertS3Path):
        cursor = connection.cursor()

        # Check if the video_id exists in videos table
        cursor.execute('SELECT id FROM videos WHERE id = %s', (video_id,))
        video_record = cursor.fetchone()
        if video_record:
            # Insert new record into convertVideos table without specifying the id field
            cursor.execute('INSERT INTO convert_videos (AconvertS3Path) VALUES (%s)', (convertS3Path,))
            connection.commit()

            # Get the last inserted id from convert_videos table
            convertVideosId = cursor.lastrowid
            # Update foreign key in videos table
            cursor.execute('UPDATE videos SET convertVideosId = %s WHERE id = %s',
                           (convertVideosId, video_id))
            connection.commit()
            cursor.close()
            return True
        else:
            cursor.close()
            return False


    # video_id에 해당하는 레코드(행)의 original_path를 삭제
    def delete_original_video_s3_path(self, connection, video_id):
        cursor = connection.cursor()
        cursor.execute('UPDATE videos SET original_s3_path = NULL WHERE id = %s', video_id)
        connection.commit()
        cursor.close()