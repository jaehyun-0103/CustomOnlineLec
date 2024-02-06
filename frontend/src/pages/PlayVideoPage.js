import React from "react";
import { Link, useParams } from "react-router-dom";

const PlayVideo = () => {
  const { id } = useParams();
  return (
    <div>
      Playing video with ID: {id}
    </div>
  );
};

export default PlayVideo;
