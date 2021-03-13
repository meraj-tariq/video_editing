/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import VideoControllers from "../../Components/VideoControllers";
import { fetchAllVideos } from "../../Store/Actions/VideoAction";
import { Root } from "./styles";

export default function Settings() {
  const dispatch = useDispatch();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const videoUrl = useSelector((state) => state.video.CurrentVideoReducer.url);

  useEffect(() => {
    dispatch(fetchAllVideos());
  }, []);

  return (
    <Root>
      <WorkSpace>
        <EditArea>Settings</EditArea>
        <PreviewArea>
          {videoUrl && <EditableVideo src={videoUrl} setVideo={setVideoEl} />}
        </PreviewArea>
      </WorkSpace>
      <ScrubArea>
        <VideoControllers video={videoEl!} />
      </ScrubArea>{" "}
    </Root>
  );
}
const EditArea = styled.div`
  width: 25%;
`;

const PreviewArea = styled.div`
  width: 50%;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
  }
`;

const WorkSpace = styled.div`
  display: flex;
  margin-bottom: 2rem;
  height: 80%;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    flex-direction: column;
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
  transition: all 1s ease;
`;
