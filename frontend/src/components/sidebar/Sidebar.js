import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const SidebarContent = styled.nav`
  width: 200px;
  height: 100%;
  background-color: #333;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #ffcc00;
  }
`;

function Sidebar() {
  return (
    <SidebarContent>
      <Link to="/videoList">
        <BackButton>
          <IoIosArrowBack />
        </BackButton>
      </Link>
      <SidebarList>
        <SidebarItem>
          <SidebarLink to="/attach">Attach</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/modify">Modify</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/inform">VideoInfo</SidebarLink>
        </SidebarItem>
      </SidebarList>
    </SidebarContent>
  );
}

export default Sidebar;
