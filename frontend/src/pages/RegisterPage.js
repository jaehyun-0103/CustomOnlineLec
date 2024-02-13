import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import logo from '../assets/img/UUJJ.png';
import Background from "../assets/img/Group.png";
import GoogleLogin from "../assets/img/Google login.png";
import OR from "../assets/img/Or.png";
import button1 from "../assets/img/button1.png";
import { Link, useNavigate } from "react-router-dom";

const LogoImage = styled.img.attrs({
  src: logo
})`
  position: absolute;
  width: 100px;
  height: 35px;
  left: 10px;
  top: 20px;
`;

const PageBackGround = styled.img.attrs({
  src: Background
})`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

const Font = styled.div`
  display: flex;
  position: absolute;
  font-family: 'ABeeZee';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

const LoginImg = styled.button`
  position: absolute;
  width: 475.09px;
  height: 57.55px;
  left: 31%;
  right: 33.59%;
  top: 30%;
  bottom: 58.39%;
  background: url(${GoogleLogin});
  border: none;
`;

const OrImg = styled.img.attrs({
  src:OR
})`
  position: absolute;
  left: 31%;
  right: 33.59%;
  top: 40%;
  bottom: 53.91%;
`;

const InfoInput = styled.input`
  box-sizing: border-box;
  position: absolute;
  width: 480px;
  height: 58px;
  padding: 12px;
  font-size: 16px;
  background: #F5F5F5;
  border: 1px solid #B7B7B7;
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button`
  position: absolute;
  width: 480px;
  height: 60px;
  left: 31%;
  top: 540px;
  background: url(${button1});
  background-size: cover;
  background-position: 20% 30%;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    try {
      await axios.post("/join", {
        nickname,
        username,
        password
      });
      
      console.log('회원가입 요청 성공'); // 요청 성공 시 콘솔 로그 추가
      showToast1('회원가입이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 요청 실패:', error); // 요청 실패 시 오류 메시지 콘솔에 출력
      console.log(error);
    }
  };
  
  const showToast1 = (message) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '10px 20px';
    toast.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '9999';
    toast.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);

    navigate("/login");
  };

  return (
      <div>
        <form>
          <PageBackGround/>
          <Link to="/">
            <LogoImage />
          </Link>
          <Font style={{ width: '200px', height: '48px', left: '44%', top: '130px', fontSize: "30px"}}>
            회원가입
          </Font>
          <LoginImg/>
          <OrImg/>
          <InfoInput  
            type="text" 
            placeholder="Nickname..." 
            style={{ left: "31%" , top: "320px" }}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <InfoInput  
            type="text" 
            placeholder="Id..."
            style={{ left: "31%" , top: "390px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InfoInput  
            autoComplete='on'
            type="password" 
            placeholder="***************" 
            style={{ left: "31%" , top: "460px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister}>
            회원가입
          </Button>
        </form>
      </div>
    );
}
