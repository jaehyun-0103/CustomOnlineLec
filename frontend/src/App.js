import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/MainPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";
import UploadList from "./pages/UploadListPage";
import Attach from "./pages/uploadVideo/AttachVideoPage";
import Modify from "./pages/uploadVideo/ModifySubtitlePage";
import VideoInfo from "./pages/uploadVideo/VideoInfoPage";
import VideoList from "./pages/VideoListPage";
import PlayVideo from "./pages/PlayVideoPage";
import Audio from "./components/selection/SelectAudio";
import Avatar from "./components/selection/SelectAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/uploadList" element={<UploadList />} />
        <Route path="/attach" element={<Attach />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/inform" element={<VideoInfo />} />
        <Route path="/videoList" element={<VideoList />} />
        <Route path="/video/:id" element={<PlayVideo />} />
        <Route path="/selectAudio" element={<Audio />} />
        <Route path="/selectAvatar" element={<Avatar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
