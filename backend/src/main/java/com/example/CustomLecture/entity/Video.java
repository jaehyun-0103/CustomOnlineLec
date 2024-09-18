package com.example.CustomLecture.entity;

import com.example.CustomLecture.dto.Request.VideoSaveRequestDTO;
import com.example.CustomLecture.dto.Response.VideoInfoResponseDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "videos")
@NoArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "video_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private UserEntity member;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "videoDataId")
    private VideoData videoData;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "convertVideosId")
    private ConvertVideos convertVideos;

    private String title;

    private String content;

    private LocalDateTime date;

    private String subject;

    //자막
    @Column(columnDefinition = "LONGTEXT")
    private String subtitle;

    // @Column(unique = true)
    private String originalS3Path;


    // @Column(unique = true)
    // private String subtitleS3Path;

    private String thumbnailS3Path;
    private String lectureNoteS3Path;


    public Video(final Long id, final UserEntity member, final String title, final String content, final String subject, final String subtitle, final String thumbnailS3Path, final String lectureMaterialsS3Path) {
        this.id = id;
        this.member = member;
        this.title = title;
        this.content = content;
        this.subject = subject;
        this.subtitle = subtitle;
        this.thumbnailS3Path = thumbnailS3Path;
        this.lectureNoteS3Path = lectureMaterialsS3Path;

    }

    public void setVideo(VideoSaveRequestDTO videoSaveRequestDTO, UserEntity user) {
        this.setMember(user);
        this.setTitle(videoSaveRequestDTO.getTitle());
        this.setContent(videoSaveRequestDTO.getContent());
        this.setSubject(videoSaveRequestDTO.getSubject());
        this.setSubtitle(videoSaveRequestDTO.getSubtitle());
        this.setThumbnailS3Path(videoSaveRequestDTO.getThumbnailS3Path());
        this.setLectureNoteS3Path(videoSaveRequestDTO.getLectureNoteS3Path());
        this.setDate(LocalDateTime.now());
    }

    public String getFormattedDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return this.date.format(formatter);
    }
    public VideoInfoResponseDTO toVideoInfoResponseDTO(UserEntity user, VideoData videoData, ConvertVideos s3Path) {
        return new VideoInfoResponseDTO(
                // 영상 정보
                this.getTitle(),
                this.getContent(),
                this.getSubject(),
                this.getLectureNoteS3Path(),
                this.getFormattedDate(),

                //자막 정보
                this.getSubtitle(),

                // 강사 정보
                user.getNickname(),
                user.getProfileS3Path(),

                // 영상 상세 정보
                videoData.getX(),
                videoData.getY(),
                videoData.getWidth(),
                videoData.getHeight(),
                videoData.getVideoWidth(),
		        videoData.getVideoHeight(),

                s3Path.getJimin(),
                s3Path.getJung(),
                s3Path.getIu(),
                s3Path.getKarina()
        );
    }

}
