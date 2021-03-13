/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import VideoControllers from "../../Components/VideoControllers";
import UseJobId from "../../Hooks/UseJobId";

import { Button } from "../../Styles/styles.global";
import { Root } from "./styles";
import useService from "../../Hooks/UseService";
import { getFrameService } from "../../Services/Video";
import { ScreenShotModal } from "../../Components/Modal/ScreenShotModal";
import useModal from "../../Hooks/UseModal";
import { convertSecondsToTime } from "../../Utils/secondsToTimeConverter";
import useWindowSize from "../../Hooks/UseWindowSize";

export default function EditVideo() {
  const slug = localStorage.getItem("slug");
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const imageModal = useModal<{ img: string }>();

  const getFrame = useService(getFrameService);

  const [width] = useWindowSize();

  const maxMobileScreenWidth = 767;
  const isMobile = width < maxMobileScreenWidth;

  const { videoUrl } = useSelector((state) => ({
    videoUrl: state.video.CurrentVideoReducer.url,
  }));
  const { existingJobId } = UseJobId();

  const getFrameNow = () => {
    getFrame
      .call(
        convertSecondsToTime(videoEl?.currentTime!),
        existingJobId ? existingJobId! : slug!,
        existingJobId ? true : false
      )
      .onSuccess((res: any) => {
        imageModal.open({ img: `data:image/png;base64,${res?.frame}` });
      });
  };

  return (
    <Root>
      <WorkSpace>
        <PreviewArea>
          {videoUrl && <EditableVideo src={videoUrl} setVideo={setVideoEl} />}
        </PreviewArea>

        <GifAndFrame>
          <Note>
            NOTE:{" "}
            <Span>
              {" "}
              You get the screenshot of the video position by clicking the
              button below.
            </Span>
          </Note>
          <GetFrame>
            <Button
              disabled={getFrame.isLoading}
              onClick={getFrameNow}
              width={isMobile ? "90%" : "100%"}
            >
              Get Video Frame
            </Button>
          </GetFrame>
        </GifAndFrame>
      </WorkSpace>

      <ScrubArea>
        <VideoControllers video={videoEl!} />
      </ScrubArea>

      <ScreenShotModal controller={imageModal} />
    </Root>
  );
}

const PreviewArea = styled.div`
  width: 70%;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
  }
`;
const WorkSpace = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
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

const GifAndFrame = styled.div`
  width: 25%;
  margin: 10px auto;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
    height: fit-content;
  }
`;

const GetFrame = styled.div``;

const Note = styled.p`
  margin-bottom: 1rem;
  margin-left: .5rem;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
`;

const Span = styled.span`
  color: ${({ theme }) => theme.colors.GREY};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOOK};
`;

export const LoaderCover = styled.div`
  text-align: center;
`;

export const LoaderText = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.WHITE};
`;
