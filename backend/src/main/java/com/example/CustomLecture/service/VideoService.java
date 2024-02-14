package com.example.CustomLecture.service;

import com.example.CustomLecture.dto.Request.VideoSaveRequestDTO;
import com.example.CustomLecture.dto.Response.VideoSaveResponseDTO;
import com.example.CustomLecture.entity.UserEntity;
import com.example.CustomLecture.entity.Video;
import com.example.CustomLecture.repository.UserRepository;
import com.example.CustomLecture.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@Service
@Transactional
@RequiredArgsConstructor
@RestController
public class VideoService {
    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

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

    public String  convertVideo(String requestBody){
        // 플라스크 서버 URL
        String flaskUrl = "http://localhost:5000/convert";

        // HTTP 요청 헤더 설정(Flask에 JSON 형식이란 것을 알기리 위해 header에 포함)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 객체 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        System.out.println(requestEntity);


        // 플라스크 서버로 요청 전송 및 응답 받기
        ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, requestEntity, String.class);

        return response.getBody();
    }

}
