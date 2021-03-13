/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export type TFormData = {
  scale: number | null;
};

const TrimmedSlider: React.FC<{
  video: HTMLVideoElement;
  timeTo: number;
  timeFrom: number;
  timePercent: number;
  timeToPercent: number;
  currentTime: number;
}> = React.memo(
  ({
    video: videoEl,
    currentTime,
    timeTo,
    timeFrom,
    timePercent,
    timeToPercent,
  }) => {
    const { pathname } = useLocation();

    const [played, setPlayed] = useState(0);

    const updatePlayTime = (time: number) => {
      const diff = time - timeFrom;
      const newDuration = Math.floor(timeTo - timeFrom);
      const play = (diff * 100) / newDuration;

      setPlayed(isNaN(play) || play === Infinity ? 0 : play);

      if (timeFrom === 0 && timeTo === 0) {
        setPlayed((time / videoEl.duration) * 100);
      }
    };

    useEffect(() => {
      const listener = () => {
        if (videoEl) {
          updatePlayTime(currentTime);
        }
      };

      videoEl?.addEventListener("timeupdate", listener);

      return () => {
        videoEl?.removeEventListener("timeupdate", listener);
      };
    }, [currentTime]);

    return (
      <>
        {pathname === "/edit/trim-video" && (
          <Progress>
            <CutLeft width={timePercent}></CutLeft>
            <ToPlayed width={100 - (timePercent + (100 - timeToPercent))}>
              <Played width={Math.floor(played)} isPlayed={played > 0}></Played>
            </ToPlayed>
            <CutRight width={100 - timeToPercent}></CutRight>
          </Progress>
        )}
      </>
    );
  }
);
export default TrimmedSlider;

export const LoaderCover = styled.div`
  text-align: center;
`;

export const LoaderText = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.WHITE};
`;

export const Progress = styled.div`
  /* border-radius: 0px;
  height: 10px; */
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export const CutLeft = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  background: ${({ theme }) => theme.colors.GREY};
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  transition: width 0.6s ease;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
`;

export const Played = styled.div<{ width: number; isPlayed: boolean }>`
  width: ${({ width }) => `${width}%`};
  box-sizing: border-box;
  height: 100%;
  background: ${({ theme, isPlayed }) => isPlayed && theme.colors.DANGER};
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  transition: width 0.6s ease;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
`;

export const ToPlayed = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  background: ${({ theme }) => theme.colors.LIGHT_PINK};
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  transition: width 0.6s ease;

  background-size: 1rem 1rem;
`;

export const CutRight = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  background: ${({ theme }) => theme.colors.GREY};
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  transition: width 0.6s ease;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
`;
