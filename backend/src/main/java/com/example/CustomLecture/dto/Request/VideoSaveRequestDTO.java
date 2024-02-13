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
//    private String subtitleS3Path;


//    private String originalS3Path;


    // DB에서 자동 생성
//    private Date date;

    // s3 스토리지에 저장
//    private Blob lectureNote;
//    private Blob thumbnail;

    // 백엔드에서 변환 작업 후 VideoPostResponseDTO에서 사용
//    private String convertS3Path;


}