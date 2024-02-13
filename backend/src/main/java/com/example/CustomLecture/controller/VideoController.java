package com.example.CustomLecture.controller;

import com.example.CustomLecture.dto.Request.VideoSaveRequestDTO;
import com.example.CustomLecture.service.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// swagger
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name="강의 정보 업로드 API", description = "자막 및 강의 정보를 업로드하는 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/videos")
public class VideoController {

    // 생성자 주입
    private final VideoService videoService;

    /**
     * 강의 영상 업로드 및 음성 변환
     */
    @PostMapping("/upload")
    @Operation(summary = "강의 영상 정보 업로드", description = "강의 영상 정보를 DB에 저장합니다.")
    public ResponseEntity<String> uploadVideoInfo(@RequestBody VideoSaveRequestDTO videoSaveRequestDTO) {

        try {
            // DB에 강의 영상 정보 저장
            videoService.uploadVideo(videoSaveRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body("강의 영상 업로드 및 음성 변환 성공");
        } catch (IllegalArgumentException e) {
            // 유효성 검사 실패 등 예외 발생 시 클라이언트에게 BadRequest 반환
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못되었습니다: " + e.getMessage());
        } catch (Exception e) {
            // 그 외 예상치 못한 예외 발생 시 클라이언트에게 InternalServerError 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
