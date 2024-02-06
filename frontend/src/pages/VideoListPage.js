import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;

const VideoContainer = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  margin: 0 10px 10px 0;
`;

const SearchContent = styled.div`
`;

const Search = styled.input``;

const FilterButton = styled.button``;

const Thumbnail = styled.img`
  max-width: 100%;
  max-height: 125px;
`;

const Text = styled.div`
  max-width: 100%;
  max-height: 50px;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 3px;
`;

const VideoItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const videos = [
  { id: 1, title: "간지나게 사는 방법", person: "Tony" },
  { id: 2, title: "리액트 컴포넌트 디자인", person: "Alice" },
  { id: 3, title: "웹 개발 기초", person: "Bob" },
];

const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (title, person) => {
    setSelectedVideo({ title, person });
  };

  return (
    <Container>
      <SearchContent>
        <Search placeholder="검색"></Search>
        <FilterButton>필터링</FilterButton>
      </SearchContent>
      <VideoItems>
        {videos.map((video) => (
          <Link to={`/video/${video.id}`} key={video.id}>
            <VideoContainer onClick={() => handleVideoClick(video.id, video.title, video.person)}>
              <Thumbnail src="/favicon.ico" alt="썸네일" />
              <Text>{video.title}</Text>
              <Text>{video.person}</Text>
            </VideoContainer>
          </Link>
        ))}
      </VideoItems>
    </Container>
  );
};

export default VideoList;
