import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AWS from "aws-sdk";
import Sidebar from "../../components/sidebar/Sidebar";
import styled from "styled-components";
import Navbar from "../../components/header/Navbar";
import { GoArrowRight } from "react-icons/go";
import { useDispatch } from "react-redux";
import { subtitle } from "../../redux/subtitle";
import { videoData } from "../../redux/videoData";
import { useToasts } from "react-toast-notifications";

const Container = styled.div`
  display: flex;
  margin-top: 50px;
`;

const SidebarContainer = styled.nav`
  width: 200px;
  height: 100%;
`;

const SubTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const AttachContainer = styled.div`
  padding: 10px;
  margin: 0 auto;
`;

const FileContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const VideoContainer = styled.div`
  margin-bottom: 20px;
`;

const CanvasContainer = styled.div`
  margin-bottom: 20px;

  canvas {
    border: 1px solid #000;
    width: 640px;
  }
`;

const InputPointContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  label {
    font-size: 1em;
    margin-right: 5px;
  }

  input {
    font-size: 1em;
    margin-right: 10px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const NextButton = styled(Link)`
  text-decoration: none;
  font-family: "Inter";
  font-size: 18px;
  color: black;
  margin-top: 5px;
`;

const DisabledNextButton = styled(Link)`
  text-decoration: none;
  font-family: "Inter";
  font-size: 18px;
  color: black;
  margin-top: 5px;
`;

const Attach = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rectRef = useRef({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    isDragging: false,
  });
  const genderRef = useRef("");
  const widthInputRef = useRef(null);
  const heightInputRef = useRef(null);
  const [infoText, setInfoText] = useState("");
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [isPlayed, setIsPlayed] = useState(false);
  const { addToast } = useToasts();

  const updateVideo = async (event) => {
    URL.revokeObjectURL(videoRef.current.src);
    const newFile = event.target.files[0];
    setFile(newFile);

    setVideoURL(URL.createObjectURL(newFile));

    videoRef.current.load();
    await new Promise((resolve) => {
      videoRef.current.onloadeddata = () => {
        resolve(videoRef.current);
        setVideoWidth(videoRef.current.videoWidth);
        setVideoHeight(videoRef.current.videoHeight);
      };
    });

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.getAttribute("width");
    canvas.height = video.offsetHeight;
  };

  const handleVideoPlay = () => {
    setIsPlayed(true);
  };

  const handleGenderChange = (event) => {
    genderRef.current = event.target.value;
    console.log("성별 선택 성공");
    addToast("성별이 성공적으로 선택되었습니다.", { appearance: "success", autoDismiss: true, autoDismissTimeout: 5000 });
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = rectRef.current;
    const widthInput = widthInputRef.current;
    const heightInput = heightInputRef.current;

    const drawVideoToCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.rect(rect.x, rect.y, rect.width, rect.height);
      ctx.stroke();
      ctx.closePath();

      const newInfoText = `시작 지점 : (${rect.x}, ${rect.y})`;
      setInfoText(newInfoText);

      requestAnimationFrame(drawVideoToCanvas);
    };

    const handlePlay = () => {
      drawVideoToCanvas();
    };

    video.addEventListener("play", handlePlay);

    const handleWidthInput = () => {
      const newWidth = parseInt(widthInputRef.current.value);
      if (newWidth > 0 && newWidth < canvas.width) {
        rectRef.current.width = newWidth;
        drawVideoToCanvas();
      } else {
        alert("가로 값이 올바르지 않습니다.");
        widthInputRef.current.value = rectRef.current.width;
      }
    };

    const handleHeightInput = () => {
      const newHeight = parseInt(heightInputRef.current.value);
      if (newHeight > 0 && newHeight < canvas.height) {
        rectRef.current.height = newHeight;
        drawVideoToCanvas();
      } else {
        alert("세로 값이 올바르지 않습니다.");
        heightInputRef.current.value = rectRef.current.height;
      }
    };

    widthInput.addEventListener("input", handleWidthInput);
    heightInput.addEventListener("input", handleHeightInput);

    return () => {
      video.removeEventListener("play", handlePlay);
      widthInput.removeEventListener("input", handleWidthInput);
      heightInput.removeEventListener("input", handleHeightInput);
    };
  }, [videoURL]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const isMouseInsideRect = (e, rect) => {
      const mouseX = e.clientX - canvasRef.current.getBoundingClientRect().left;
      const mouseY = e.clientY - canvasRef.current.getBoundingClientRect().top;

      return mouseX >= rect.x && mouseX <= rect.x + rect.width && mouseY >= rect.y && mouseY <= rect.y + rect.height;
    };

    const handleMouseUp = () => {
      const rect = rectRef.current;
      rect.isDragging = false;
    };

    const handleMouseDown = (e) => {
      const rect = rectRef.current;

      if (isMouseInsideRect(e, rect)) {
        rect.isDragging = true;
      }
    };

    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      const rect = rectRef.current;

      if (rect.isDragging) {
        rect.x = Math.max(0, Math.min(canvas.width - rect.width, e.clientX - canvas.getBoundingClientRect().left - rect.width / 2));
        rect.y = Math.max(0, Math.min(canvas.height - rect.height, e.clientY - canvas.getBoundingClientRect().top - rect.height / 2));
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = async () => {
    const rect = rectRef.current;
    const videoInfo = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      videoWidth,
      videoHeight,
    };

    if (!file) {
      console.error("영상 파일 로드 실패");
      addToast("영상 파일을 첨부해주세요.", { appearance: "warning", autoDismiss: true, autoDismissTimeout: 5000 });
      return;
    }

    if (!isPlayed) {
      console.error("영상 파일 정보 로드 실패");
      addToast("캠 위치를 지정해주세요.", { appearance: "warning", autoDismiss: true, autoDismissTimeout: 5000 });
      return;
    }

    if (!genderRef.current) {
      console.error("성별 선택 실패");
      addToast("성별을 선택해주세요.", { appearance: "warning", autoDismiss: true, autoDismissTimeout: 5000 });
      return;
    }

    const gender = genderRef.current;

    const VideoFileName = file.name;
    const url = `original_video/${VideoFileName}`;

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_DEFAULT_REGION,
    });

    const s3 = new AWS.S3();
    const VideoNoteParams = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: url,
      Body: file,
    };

    try {
      const data = await s3.upload(VideoNoteParams).promise();
      console.log("S3에 영상 업로드 성공");
    } catch (error) {
      console.error("S3에 영상 업로드 실패 : ", error);
      addToast("영상 업로드를 실패했습니다.", { appearance: "error", autoDismiss: true, autoDismissTimeout: 5000 });
    }

    const token = sessionStorage.getItem("token");

    dispatch(videoData(videoInfo));

    try {
      const response = await axios.post(
        "/api/videos/uploadVideo",
        {
          url,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sessionStorage.setItem("UploadVideoID", response.data.video_id);
      console.log("영상 링크 업로드 요청 성공");

      // 테스트 용
      const subtitleResponse = {
        subtitleList: [
          { end: 16.0, text: " 학습 목표는 변수와 성수를 정의하고 사용할 수 있다. 주석의 개념을 이해한다.", start: 10.0 },
          { end: 22.0, text: " 산술 연산자와 할당 연산자에 대하여 이해한다. 연산자의 우선순위 개념을 이해한다.", start: 16.0 },
          { end: 27.0, text: " 사용자로부터 입력을 받고 출력을 하는 프로그램을 작성할 수 있다.", start: 22.0 },
          { end: 35.0, text: " 문자열의 기초연산을 이해한다.", start: 27.0 },
          { end: 44.0, text: " 변수는 컴퓨터 메모리 공간에 이름을 붙이는 것으로 우리는 여기에 값을 저장할 수 있습니다.", start: 35.0 },
        ],
      };

      dispatch(subtitle(subtitleResponse));
      //

      if (response.data.stt_result == 1) {
        setTimeout(
          () => addToast("자막이 성공적으로 추출되었습니다.", { appearance: "success", autoDismiss: true, autoDismissTimeout: 5000 }),
          0
        );
        const subtitleResponse = { subtitleList: JSON.parse(response.data.subtitle) };
        dispatch(subtitle(subtitleResponse));
      } else if (response.data.stt_result == -1 || response.data.stt_result == 0)
        setTimeout(() => addToast("자막 추출을 실패했습니다.", { appearance: "error", autoDismiss: true, autoDismissTimeout: 5000 }), 0);

      if (response.data.rvc_result == 1)
        setTimeout(
          () => addToast("음성이 성공적으로 변환되었습니다.", { appearance: "success", autoDismiss: true, autoDismissTimeout: 5000 }),
          3000
        );
      else if (response.data.rvc_result == -1 || response.data.rvc_result == 0)
        setTimeout(() => addToast("음성 변환을 실패했습니다.", { appearance: "error", autoDismiss: true, autoDismissTimeout: 5000 }), 3000);

      setTimeout(
        () => addToast("영상이 성공적으로 업로드되었습니다.", { appearance: "success", autoDismiss: true, autoDismissTimeout: 5000 }),
        6000
      );
    } catch (error) {
      if (error.response) {
        console.error("영상 링크 업로드 요청 실패 : ", error.response.status);
        addToast("영상 업로드를 실패했습니다.", { appearance: "error", autoDismiss: true, autoDismissTimeout: 5000 });
      } else {
        console.error("영상 링크 업로드 요청 실패 : ", error.message);
        addToast("영상 업로드를 실패했습니다.", { appearance: "error", autoDismiss: true, autoDismissTimeout: 5000 });
      }
    }
  };

  return (
    <Container>
      <Navbar />
      <Sidebar step={1} />
      <SidebarContainer></SidebarContainer>
      <AttachContainer>
        <SubTitle>동영상 업로드</SubTitle>
        <FileContainer>
          <label htmlFor="videofile">Upload a video file : </label>
          <input type="file" id="videofile" name="videofile" accept="video/*" onChange={updateVideo} />
        </FileContainer>

        <VideoContainer>
          <video id="video" width="640" controls ref={videoRef} onPlay={handleVideoPlay}>
            <source id="videoURL" src={videoURL} type="video/mp4" />
          </video>
        </VideoContainer>

        <CanvasContainer>
          <canvas id="canvas" ref={canvasRef}></canvas>
        </CanvasContainer>

        <InputPointContainer>
          <label htmlFor="widthInput">가로 :</label>
          <input type="number" id="widthInput" ref={widthInputRef} defaultValue="100" />
          <label htmlFor="heightInput">세로 :</label>
          <input type="number" id="heightInput" ref={heightInputRef} defaultValue="100" />
          <label>
            남성
            <input type="radio" name="gender" value="man" onChange={handleGenderChange} />
          </label>
          <label>
            여성
            <input type="radio" name="gender" value="woman" onChange={handleGenderChange} />
          </label>
        </InputPointContainer>

        <InfoContainer>{infoText}</InfoContainer>
        <ButtonContainer>
          {isPlayed && file && genderRef.current ? (
            <NextButton to="/modify" onClick={handleSubmit}>
              다음 <GoArrowRight />
            </NextButton>
          ) : (
            <DisabledNextButton onClick={handleSubmit}>
              다음 <GoArrowRight />
            </DisabledNextButton>
          )}
        </ButtonContainer>
      </AttachContainer>
    </Container>
  );
};

export default Attach;
