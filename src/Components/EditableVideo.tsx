/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import VideoFrames from "./VideoFrames";
// import { Player } from "video-react";
import { useDispatch, useSelector } from "react-redux";
import { videoDimensions } from "../Store/Actions/VideoAction";

type TVideoProps = {
  src: string;
  setVideo?: (el: HTMLVideoElement) => void;
};

const EditableVideo: React.FC<TVideoProps> = ({ src, setVideo }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { defaultWidth, defaultHeight, width, height } = useSelector(
    (state) => ({
      defaultWidth: state.video.VideoDimensionReducer.defaultWidth!,
      defaultHeight: state.video.VideoDimensionReducer.defaultHeight!,
      width: state.video.VideoDimensionReducer.width!,
      height: state.video.VideoDimensionReducer.height!,
    })
  );
  const dispatch = useDispatch();

  const video = videoRef.current!;

  useEffect(() => {
    if (videoRef.current) {
      setVideo?.(videoRef.current);
    }
  }, []);
  const widthCheck =
    video?.videoWidth > 0 && video?.videoWidth !== defaultWidth;
  const heightCheck =
    video?.videoHeight > 0 && video?.videoHeight !== defaultHeight;

  useEffect(() => {
    if (widthCheck || heightCheck) {
      dispatch(
        videoDimensions({
          width: video?.videoWidth!,
          height: video?.videoHeight!,
          defaultWidth: video?.videoWidth!,
          defaultHeight: video?.videoHeight!,
        })
      );
    }
  }, [video]);

  return (
    <>
      <VideoContainer>
        <VideoCover>
          <Video
            width={width}
            height={height}
            src={src}
            ref={videoRef}
            loop
            preload="auto"
          />
        </VideoCover>
        {/* <Player>
          <source src={src} ref={videoRef} />
        </Player> */}
        <VideoFrames videoEl={video} />
      </VideoContainer>
    </>
  );
};

export default EditableVideo;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 300px;
  max-height: 400px;
  height: fit-content;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0 0 auto;
  /* align-items: center; */
  position: relative;

  background: #f1f1f1;
  transition: all 1s ease;
  overflow: hidden;
`;

const VideoCover = styled.video`
  display: none;
`;

const Video = styled.video<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  max-height: 350px;
`;

