import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoArrowRight } from "react-icons/go";
import axios from "axios";

import logo from "../assets/img/UUJJ.png";
import Background from "../assets/img/Group.png";
import GoogleLogin from "../assets/img/Google login.png";
import OR from "../assets/img/Or.png";

const LoginContainer = styled.div`
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
  align-items: center;
  justify-content: center;
  background-image: url(${Background});
  background-size: 100% 100%;
  background-position: center center;
  z-index: -1;
`;

const LoginText = styled.p`
  font-weight: 650;
  font-size: 30px;
  line-height: 15px;
`;

const RegisterButton = styled(Link)`
  text-decoration: none;
  font-family: "Inter";
  font-size: 16px;
  line-height: 22px;
  color: black;
  align-self: flex-end;
  margin-bottom: 8px;
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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      console.log("로그인 요청 성공:", response.data); // 로그인 요청 성공 시 콘솔에 응답 데이터 출력
      showToast("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error("로그인 요청 실패:", error); // 로그인 요청 실패 시 오류 메시지 콘솔에 출력
    }
  };

  const showToast = (message) => {
    alert(message); // 간단히 alert로 표시
  };

  return (
    <LoginContainer>
      <Link to="/">
        <LogoImage />
      </Link>
      <PageBackGround />
      <form>
        <BoxContainer>
          <RegisterButton to="/register">
            회원가입
            <GoArrowRight />
          </RegisterButton>
          <LoginText>로그인</LoginText>
          <ContentContainer>
            <Google />

            <OrImg />

            <TextInfo>아이디</TextInfo>
            <InfoInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <TextInfo>비밀번호</TextInfo>
            <InfoInput autoComplete="on" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <GradientButton onClick={handleLogin}>로그인</GradientButton>
          </ContentContainer>
        </BoxContainer>
      </form>
    </LoginContainer>
  );
}
