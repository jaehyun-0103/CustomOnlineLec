import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/header/Navbar";
import Background from "../../assets/img/Group.png"
import { GoArrowRight } from "react-icons/go";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  margin-top: 4rem;
  background: url(${Background});
  background-size: cover;
  background-position: center;
`;
const CustomSlider = styled(Slider)`
position: relative;
left: -30px;
width: 800px;
margin: 0 auto;

.slick-list {
  height: 160px;
}

.slick-slide {
  height: 150px;
  margin-left: 20px;
  margin: 0 10px;
  border: 1px solid #1B78DA;
}
.slick-track {
    display: flex;
  }
`;

const Font = styled.div`
diplay: flex;
position: absolute;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 24px;
`;

const UnderlinedText = styled.span`
  border-bottom: 1px solid #1B78BA;
  padding-bottom: 2px; 
`;

const Img= styled.img`
  max-width: 100%;
  max-height: 125px;
  margin-bottom: 5px;
`;

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
};

  const voices = [
    { name: "음성1", img:'https://via.placeholder.com/150'},
    { name: "음성2", img:'https://via.placeholder.com/150'},
    { name: "음성3", img:'https://via.placeholder.com/150'},
    { name: "음성4", img:'https://via.placeholder.com/150'},
    { name: "음성5", img:'https://via.placeholder.com/150'},
    { name: "음성6", img:'https://via.placeholder.com/150'}
];

  const avatars = [
    { name: "아바타1", img:'https://via.placeholder.com/150'},
    { name: "아바타2", img:'https://via.placeholder.com/150'},
    { name: "아바타3", img:'https://via.placeholder.com/150'},
    { name: "아바타4", img:'https://via.placeholder.com/150'},
    { name: "아바타5", img:'https://via.placeholder.com/150'},
    { name: "아바타6", img:'https://via.placeholder.com/150'}
  ];

const Select = () =>  {
  return (
    <div>
    <Navbar/>
    <Container>
        <Font style={{ left: '45%', top: '110px'}}>
            음성 선택
        </Font>
        <CustomSlider style={{top: "100px"}} {...settings}>
        {voices.map((voice) => (
         <div key={voice.name}>
         <Img src={voice.img}/>
         <Font>{voice.name}</Font>
       </div>
        ))} 
       </CustomSlider>
        <Font style={{ left: '44.5%', top: '370px'}}>
            아바타 선택
        </Font>
        <CustomSlider style={{top: "200px"}} {...settings}>
        {avatars.map((avatar) => (
         <div key={avatar.index}>
         <Img src={avatar.img}/>
         <Font>{avatar.name}</Font>
       </div>
        ))} 
       </CustomSlider>
        <Font style={{right: '100px', bottom: '50px', fontSize:"14px"}}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/video/:id">
        <UnderlinedText>다음</UnderlinedText> <GoArrowRight/>
        </Link>
      </Font>
    </Container>
    </div>
  );
};

export default Select;