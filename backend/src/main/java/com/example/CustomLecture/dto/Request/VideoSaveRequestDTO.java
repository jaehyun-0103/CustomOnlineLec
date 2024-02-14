package com.example.CustomLecture.dto.Request;

import com.example.CustomLecture.entity.UserEntity;
import com.example.CustomLecture.entity.Video;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VideoSaveRequestDTO {

    private Long boardId;
    private Long userId;
    private String title;
    private String content;
    private String subject;
    private String thumbnailS3Path;
    private String lectureMaterialsS3Path;
}