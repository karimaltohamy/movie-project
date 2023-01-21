import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

const VideosList = () => {
  const [videos, setVideos] = useState(null);

  const { catalog, id } = useParams();

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(catalog, id);
      setVideos(response.data.results.slice(0,4));
    };

    getVideos();
  }, [catalog, id]);

  return (
    <div className="VideosList">
      {videos && videos.map((video, i) => {
        return <Video video={video} key={i} />;
      })}
    </div>
  );
};

export const Video = (props) => {
  const video = props.video;

  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";

    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video mb-3" key={props.key}>
      <h2>{video.name}</h2>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        width="100%"
        ref={iframeRef}
        title="video"
      ></iframe>
    </div>
  );
};

export default VideosList;
