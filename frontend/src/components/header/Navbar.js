import React from 'react';
import logo from '../../assets/img/UUJJ.png';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TfiMenu } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";

const NavBarBackGround = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  position: absolute;
  top: 0;
  padding-right: 2em;
  padding-left: 2em;
  border-bottom: 1px solid #eee;
`;
const LogoImage = styled.img.attrs({
  src: logo,
  alt: "UUJJ",
})`
  position: absolute;
  width: 100px;
  height: 35px;
  left: 10px;
  top: 20px;
`;
const NavItem = styled.div`
display: flex;
top: 30%;
position: absolute;
font-family: 'Inter';
font-style: normal;
font-weight: 450;
font-size: 14px;
line-height: 28px;
color: #222831;
`;
const Search = styled.input`
  box-sizing: border-box;
  padding: 14px;
  position: absolute;
  width: 180px;
  height: 22.5px;
  left: 660px;
  top: 30%;
  background: #FFFFFF;
  border: 1px solid #E1DDDD;
  border-radius: 6px;
  outline: none;
`;

const Button = styled.button`
width: 105px;
height: 35px;
position: absolute;
top: 25%;
background: #499BE9;
border-radius: 60px;
border: 1px solid #fff;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 22px;
color: #FFFFFF;
`;

const Navbar = () => {
  
  return (
    <NavBarBackGround>
      <Link to="/">
        <LogoImage />
      </Link>
      <ul>
      <TfiMenu style={{ position: 'absolute', left: '250px', top: '40%', color: "#222831"}}/>
      </ul>
          <Link to="/">
            <NavItem style={{left: "300px"}}>
              Home
            </NavItem>
          </Link>
 
          <Link to="/attach">
           <NavItem style={{left: "370px"}}>
              강의 업로드
            </NavItem>
          </Link>

          <Link to="/videoList">
           <NavItem style={{left: "470px"}}>
              강의 목록
            </NavItem>
          </Link>

          <Link to="/mypage">
           <NavItem style={{left: "560px"}}>
              마이페이지
            </NavItem>
          </Link>
          <Search type="search"  placeholder="Search..."></Search>
          <Link to="/login">
           <Button style={{left: "72%", color: "#499BE9", background: "#FFFFFF", border: "1px solid #E1DDDD"}}>
              로그인
          </Button>
          </Link>
          <Link to="/register">
           <Button style={{left: "80%"}}>
              회원가입
          </Button>
          </Link>
    </NavBarBackGround>
  );
};

export default Navbar;
