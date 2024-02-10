import React from 'react'
import styled from "styled-components";

import logo from '../assets/img/UUJJ.png';
import Background from "../assets/img/Group.png"
import GoogleLogin from "../assets/img/Google login.png"
import OR from "../assets/img/Or.png"
import button1 from "../assets/img/button1.png"

import { Link } from "react-router-dom";

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
font-style: nomal;
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
`
const OrImg = styled.img.attrs({
  src:OR
})`
position: absolute;
left: 31%;
right: 33.59%;
top: 40%;
bottom: 53.91%;
`
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
height: 60px;;
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
  return (
    <div>
    <PageBackGround/>
    <Link to="/">
        <LogoImage />
      </Link>
    <Font style={{ width: '200px', height: '48px', left: '44%', top: '130px', fontSize: "30px"}}>
      회원가입
    </Font>
    <LoginImg/>
    <OrImg/>
    <InfoInput  type="text" placeholder="Email..." style={{ left: "31%" , top: "320px" }}/>
    <InfoInput  type="text" placeholder="Username..." style={{ left: "31%" , top: "390px" }}/>
    <InfoInput  type="text" placeholder="***************" style={{ left: "31%" , top: "460px" }}/>
    <Button onClick={() => console.log('Button Clicked')}>
      회원가입
    </Button>
    </div>
  )
}
