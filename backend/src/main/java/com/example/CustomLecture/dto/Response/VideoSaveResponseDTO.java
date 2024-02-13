package com.example.CustomLecture.dto.Response;

import com.example.CustomLecture.entity.UserEntity;
import com.example.CustomLecture.entity.Video;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VideoSaveResponseDTO {

    private Long id;
    private UserEntity user;
    private String title;
    private String content;
    private String subject;
    private String thumbnailS3Path;
    private String lectureMaterialsS3Path;

//    private String subtitleS3Path;


    public Video toVideo(VideoSaveResponseDTO videoSaveResponseDTO) {
        Video video = new Video(
                videoSaveResponseDTO.getId(),
                videoSaveResponseDTO.getUser(),
                videoSaveResponseDTO.getTitle(),
                videoSaveResponseDTO.getContent(),
                videoSaveResponseDTO.getSubject(),
                videoSaveResponseDTO.getThumbnailS3Path(),
                videoSaveResponseDTO.getLectureMaterialsS3Path()
        );
        video.setDate(new Timestamp(System.currentTimeMillis())); // 현재 시간을 설정
        return video;
    }
}
