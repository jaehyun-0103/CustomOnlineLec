package com.example.CustomLecture.service;

import com.example.CustomLecture.dto.Request.VideoSaveRequestDTO;
import com.example.CustomLecture.dto.Response.VideoSaveResponseDTO;
import com.example.CustomLecture.entity.UserEntity;
import com.example.CustomLecture.entity.Video;
import com.example.CustomLecture.repository.UserRepository;
import com.example.CustomLecture.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;







@Service
@Transactional
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    /**
     * 강의 영상 업로드 및 음성 변환
     */
    public void uploadVideo(VideoSaveRequestDTO videoSaveRequestDTO) {

        // userId로 부터 UserEntity 객체 추출
        UserEntity userEntity = userRepository
                .findById(videoSaveRequestDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 ID 입니다."));

        VideoSaveResponseDTO videoSaveResponseDTO = new VideoSaveResponseDTO(videoSaveRequestDTO.getBoardId(), userEntity, videoSaveRequestDTO.getTitle(), videoSaveRequestDTO.getContent(), videoSaveRequestDTO.getSubject(), videoSaveRequestDTO.getThumbnailS3Path(), videoSaveRequestDTO.getLectureMaterialsS3Path());

        // DTO 객체를 domain 객체로 변환
        Video video = videoSaveResponseDTO.toVideo(videoSaveResponseDTO);


        // DB에 강의 영상 정보 저장
        videoRepository.save(video);
    }
}
