import React from 'react';
import logo from '../../assets/img/UUJJ.png';
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { TfiMenu } from "react-icons/tfi";

const NavBarBackGround = styled.div`
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

const NavbarContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  left: 25%;
  top: 25%;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center; 
  margin-right: 30px;
  text-decoration: none;
  color: #222831;
  font-weight: 450;
  font-size: 14px;
  line-height: 28px;
  &.active { 
    font-weight: bold; 
    color: #499BE9;
  }
`;

const Button = styled.button`
  width: 105px;
  height: 35px;
  background: #499BE9;
  border-radius: 60px;
  border: 1px solid #fff;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  margin-left: 3px;
`;

const Navbar = () => {
  const token = sessionStorage.getItem('token');

  return (
    <NavBarBackGround>
      <Link to="/">
        <LogoImage />
      </Link>
      <TfiMenu style={{ position: 'absolute', left: '300px', top: '40%', color: "#222831"}}/>
      <NavbarContainer>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/attach">강의 업로드</NavItem>
        <NavItem to="/videoList">강의 목록</NavItem>
        {token ? (
          <NavItem to="/mypage">마이페이지</NavItem>
        ) : (
          <>
            <Link to="/login">
              <Button style={{ color: "#499BE9", background: "#FFFFFF", border: "1px solid #E1DDDD" }}>
                로그인
              </Button>
            </Link>
            <Link to="/register">
              <Button>
                회원가입
              </Button>
            </Link>
          </>
        )}
      </NavbarContainer>
    </NavBarBackGround>
  );
};

export default Navbar;
