import React from 'react'
import styled from "styled-components";

import Navbar from "../components/header/Navbar";

import Background from "../assets/img/background.png"
import Mainimg from "../assets/img/MainImg.png"
import button2 from "../assets/img/button2.png"

import { FaRegCirclePlay } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

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
const MainImg = styled.img.attrs({
  src: Mainimg
})`
position: absolute;
width: 683.47px;
height: 540.82px;
left: 706.91px;
top: 94px;
filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.1));
transform: rotate(10deg);
`
const Font = styled.div`
diplay: flex;
position: absolute;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 24px;
`;
const Button = styled.button`
position: absolute;
width: 249px;
height: 54px;
left: 115px;
top: 410px;
background: url(${button2});
background-size: cover;
background-position: 30% 35%;
border: none;
font-style: normal;
font-size: 14px;
line-height: 22px;
color: #FFFFFF;
`;

export default function MainPage() {
  return (
  
    <div>
    <PageBackGround/>
    <Navbar/>
    <MainImg/>
   <Font style={{ fontWeight: "600", fontSize: "20px", lineHeight: "24px", left: "147px", top: "208px",color: "rgba(255, 5, 110, 0.49)" }}>
    LEARN FROM TODAY
    </Font>
   <Font style={{ fontWeight: "643", fontSize: "58px", lineHeight: "64px", left: "137px", top: "268px",color: "#2C2C2C" }}>
    커스텀 인강 사이트</Font>
    <Font style={{fontWeight: "579", fontSize: "18px", lineHeight: "24px", left: "137px", top: "351px",color: "rgba(54, 37, 66, 0.49)" }}>
    강의를 업로드하고 원하는 음성과 캐릭터를 선택해 강의를 시청해보세요!</Font>
    <Link to="/attach">
    <Button>
    강의 업로드 하러가기 <GoArrowRight style={{marginLeft: '5px'}} />
    </Button>
    </Link>
    <Link to="/videoList">
    <Font style={{ fontWeight: "bold", fontSize: "14px", lineHeight: "22px", left: "160px", top: "480px",color: "#499BE9" }}>
    강의 시청하기 <FaRegCirclePlay/>
    </Font> 
    </Link>
    </div>
  )
}
