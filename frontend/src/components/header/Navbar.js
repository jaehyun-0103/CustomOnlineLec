import React from 'react';
import logo from '../../assets/img/UUJJ.png';
import { Link, NavLink } from "react-router-dom";
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

const SearchContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #E1DDDD;
  margin-right: 30px;
`;

const SearchInput = styled.input`
  padding: 14px 40px 14px 14px;
  width: 180px;
  height: 23px;
  background: #FFFFFF;
  outline: none;
  border:none;
  margin-right: 3px;
  margin-left: 3px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1px;
  top: 60%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
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
  margin-left: auto;
`;

const Navbar = () => {
  return (
    <NavBarBackGround>
      <Link to="/">
        <LogoImage />
      </Link>
      <TfiMenu style={{ position: 'absolute', left: '300px', top: '40%', color: "#222831"}}/>
      <NavbarContainer>
        <NavItem exact to="/">Home</NavItem>
        <NavItem to="/attach">강의 업로드</NavItem>
        <NavItem to="/videoList">강의 목록</NavItem>
        <NavItem to="/mypage">마이페이지</NavItem>
        <SearchContainer>
          <SearchInput type="search"  placeholder="Search..." />
          <SearchButton>
            <IoIosSearch style={{color: "#222831"}}/>
          </SearchButton>
        </SearchContainer>
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
      </NavbarContainer>
    </NavBarBackGround>
  );
};

export default Navbar;
