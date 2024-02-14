import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import logo from "../assets/img/UUJJ.png";
import Background from "../assets/img/Group.png";
import GoogleLogin from "../assets/img/Google login.png";
import OR from "../assets/img/Or.png";

const RegistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img.attrs({
  src: logo,
})`
  position: absolute;
  width: 100px;
  height: 35px;
  left: 10px;
  top: 11px;
`;

const PageBackGround = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${Background});
  background-size: 100% 100%;
  background-position: center center;
  z-index: -1;
`;

const RegistText = styled.p`
  font-weight: 650;
  font-size: 30px;
  line-height: 15px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 400px;
`;

const Google = styled.button`
  width: 400px;
  height: 57.55px;
  background: url(${GoogleLogin});
  border: none;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
`;

const OrImg = styled.div`
  width: 400px;
  height: 30px;
  background-image: url(${OR});
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextInfo = styled.span`
  margin-top: 20px;
  align-self: flex-start;
`;

const InfoInput = styled.input`
  box-sizing: border-box;
  width: 400px;
  height: 45px;
  padding: 12px;
  font-size: 16px;
  background: #f5f5f5;
  border: 1px solid #b7b7b7;
  border-radius: 4px;
  outline: none;
`;

const GradientButton = styled.button`
  text-decoration: none;
  background: linear-gradient(90deg, #5bacf2, #6ed8c2);
  border-radius: 20px;
  padding: 10px 15px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  border: none;
  cursor: pointer;
  margin-top: 80px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("/join", {
        nickname,
        username,
        password,
      });

      console.log("회원가입 요청 성공"); // 요청 성공 시 콘솔 로그 추가
      showToast1("회원가입이 성공적으로 완료되었습니다.");
    } catch (error) {
      console.error("회원가입 요청 실패:", error); // 요청 실패 시 오류 메시지 콘솔에 출력
      console.log(error);
    }
  };

  const showToast1 = (message) => {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "10px 20px";
    toast.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
    toast.style.color = "#fff";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "9999";
    toast.style.transition = "opacity 0.3s ease";

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);

    navigate("/login");
  };

  return (
    <RegistContainer>
      <PageBackGround />
      <Link to="/">
        <LogoImage />
      </Link>
      <form>
        <BoxContainer>
          <RegistText>회원가입</RegistText>
          <ContentContainer>
            <Google />

            <OrImg />

            <TextInfo>아이디</TextInfo>
            <InfoInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <TextInfo>비밀번호</TextInfo>
            <InfoInput autoComplete="on" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <TextInfo>닉네임</TextInfo>
            <InfoInput type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />

            <GradientButton onClick={handleRegister}>회원가입</GradientButton>
          </ContentContainer>
        </BoxContainer>
      </form>
    </RegistContainer>
  );
}
