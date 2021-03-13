/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import { ScreenShotModal } from "../../Components/Modal/ScreenShotModal";
import TrimmedVideo from "../../Components/TrimmedVideo";
import VideoControllers from "../../Components/VideoControllers";
import useModal from "../../Hooks/UseModal";
import { Root } from "./styles";

export default function EditVideo() {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const imageModal = useModal<{ img: any }>();

  const { videoUrl } = useSelector((state) => ({
    videoUrl: state.video.CurrentVideoReducer.url,
  }));

  return (
    <Root>
      <WorkSpace>
        <PreviewArea>
          {videoUrl && <EditableVideo src={videoUrl} setVideo={setVideoEl} />}
        </PreviewArea>
        <GifCover>
          <TrimmedVideo video={videoEl!} />
        </GifCover>
      </WorkSpace>

      <ScrubArea>
        <VideoControllers video={videoEl!} />
      </ScrubArea>

      <ScreenShotModal controller={imageModal} />
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

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    flex-direction: column-reverse;
  }
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

const GifCover = styled.div`
  width: 40%;
  min-width: 400px;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
    min-width: 100%;
    margin-bottom: 2rem;
  }
`;

export const LoaderCover = styled.div`
  text-align: center;
`;

export const LoaderText = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.WHITE};
`;
