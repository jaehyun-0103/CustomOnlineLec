import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <button>
        <Link to="/">main</Link>
      </button>
      <button>
        <Link to="/videoList">videoList</Link>
      </button>
      <button>
        <Link to="/attach">attach</Link>
      </button>
      <button>
        <Link to="/mypage">mypage</Link>
      </button>
      <hr></hr>
      <button>
        <Link to="/video">테스트용 영상 내용 링크</Link>
      </button>
    </div>
  );
};

export default Main;
