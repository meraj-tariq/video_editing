/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import VideoControllers from "../../Components/VideoControllers";

import { Root } from "./styles";

export default function EditVideo() {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const { videoUrl } = useSelector((state) => ({
    videoUrl: state.video.CurrentVideoReducer.url,
  }));

  return (
    <Root>
      <WorkSpace>
        <PreviewArea>
          {videoUrl && <EditableVideo src={videoUrl} setVideo={setVideoEl} />}
        </PreviewArea>
      </WorkSpace>

      <ScrubArea>
        <VideoControllers video={videoEl!} />
      </ScrubArea>
    </Root>
  );
}

const PreviewArea = styled.div`
  width: 100%;
`;
const WorkSpace = styled.div`
  display: flex;
  margin-bottom: 2rem;
  height: 80%;
`;

const ScrubArea = styled.div`
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.shadows.S3};
  height: fit-content;
  width: 100%;
  z-index: 1;
  padding: 1rem;
  box-sizing: border-box;
`;

export const LoaderCover = styled.div`
  text-align: center;
`;

export const LoaderText = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.WHITE};
`;
