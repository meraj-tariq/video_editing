import React, { useEffect, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useWindowSize from "../Hooks/UseWindowSize";
import { colors } from "../Theme";
import { convertSecondsToTime } from "../Utils/secondsToTimeConverter";
import TrimmedVideo from "./TrimmedVideo";

const includePath = ["/edit/trim-video"];

const VideoControllers: React.FC<{
  video: HTMLVideoElement;
}> = ({ video }) => {
  const location = useLocation();
  const [mouseDown, setMouseDown] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const position = convertSecondsToTime(video?.currentTime ?? 0);
  const fullDuration = convertSecondsToTime(
    video?.duration!.toString() === "NaN" ? 0 : video?.duration!
  );

  const [width] = useWindowSize();

  const maxMobileScreenWidth = 767;
  const isMobile = width < maxMobileScreenWidth;

  const togglePlay = () => {
    if (isPaused) {
      video?.play();
      setIsPaused(false);
    } else {
      video?.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    video?.addEventListener("pause", () => {
      setIsPaused(true);
    });

    return () => {
      video?.removeEventListener("pause", () => {
        setIsPaused(true);
      });
    };
  }, [video]);

  useEffect(() => {
    video?.addEventListener("play", () => {
      setIsPaused(false);
    });

    return () => {
      video?.removeEventListener("play", () => {
        setIsPaused(false);
      });
    };
  }, [video]);

  const Forward = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (video) {
      video.currentTime += parseFloat(e.currentTarget.dataset.skip!);
    }
  };

  const Backward = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (video) {
      video.currentTime += parseFloat(e.currentTarget.dataset.skip!);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (video) {
      video["volume"] = parseFloat(e.target.value);
    }
  };

  useEffect(() => {
    const listener = () => {
      if (video) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video?.addEventListener("timeupdate", listener);

    return () => {
      video?.removeEventListener("timeupdate", listener);
    };
  }, [video]);

  const scrub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (video) {
      const scrubTime =
        (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }
  };

  return (
    <div>
      <TopControls>
        <MainDuration style={{ color: colors.SECONDARY_TEXT }}>
          {position}
        </MainDuration>
        <IconsCover>
          <IconSpacer>
            {!isMobile && (
              <BackwardIcon
                data-skip={-10}
                color={colors.PRIMARY}
                onClick={Backward}
              />
            )}
            <IconButton
              title={isPaused ? "Play" : "Pause"}
              onClick={togglePlay}
              type="button"
            >
              {isPaused ? (
                <FaPlay
                  color={colors.PRIMARY}
                  fontSize={isMobile ? "15px" : "20px"}
                />
              ) : (
                <FaPause
                  color={colors.PRIMARY}
                  fontSize={isMobile ? "15px" : "20px"}
                />
              )}
            </IconButton>

            {!isMobile && (
              <ForwardIcon
                data-skip={25}
                color={colors.PRIMARY}
                onClick={Forward}
              />
            )}
          </IconSpacer>
        </IconsCover>
        <TopRightControls>
          <Range
            type="range"
            name="volume"
            min="0"
            max="1"
            step="0.05"
            defaultValue="1"
            onChange={handleVolumeChange}
          />
          {!isMobile && (
            <p>
              <Small>Start</Small> <Duration>{position} </Duration>
            </p>
          )}
          {!isMobile && <p>|</p>}
          {!isMobile && (
            <p>
              <Small>End</Small> <Duration>{fullDuration}</Duration>
            </p>
          )}

          {isMobile && (
            <MainDuration style={{ color: colors.SECONDARY_TEXT }}>
              {fullDuration}
            </MainDuration>
          )}
        </TopRightControls>
      </TopControls>
      {location.pathname !== "/edit/trim-video" && (
        <Progress
          onClick={scrub}
          onMouseMove={(e) => mouseDown && scrub(e)}
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
        >
          <ProgressFilled style={{ width: `${progress}%` }}></ProgressFilled>
        </Progress>
      )}

      {includePath.includes(location.pathname) && (
        <div>
          <TrimmedVideo video={video} />
        </div>
      )}
    </div>
  );
};

export default VideoControllers;

const TopControls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  /* text-align: center; */
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const TopRightControls = styled.div`
  display: flex;
  /* width: 50%; */
  justify-content: flex-end;
  input,
  p {
    margin: 0 5px;
  }
`;

const IconsCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 10rem; */
`;
const IconSpacer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 4px;

  &:focus {
    outline: none;
  }
`;

const BackwardIcon = styled(FaBackward)`
  cursor: pointer;
`;

const ForwardIcon = styled(FaForward)`
  cursor: pointer;
`;

const Duration = styled.span`
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_MEDIUM};
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
  margin: 0.5rem;
`;

const MainDuration = styled(Duration)`
  font-size: 18px;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    font-size: 13px;
  }
`;

const Small = styled.small`
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  margin: 0.25rem;
`;

const Range = styled.input`
  -webkit-appearance: none;
  &::-webkit-slider-runnable-track {
    height: 0.35em;
    background: ${({ theme }) => theme.colors.PRIMARY};
    border: none;
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 1.1em;
    width: 1.1em;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.PRIMARY_DARK};
    margin-top: -5px;
  }

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 50px;
  }
`;

const Progress = styled.div`
  width: 100%;
  transition: height 0.3s;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.LIGHT_PINK};
  height: 8px;
`;

const ProgressFilled = styled.div`
  background: ${({ theme }) => theme.colors.DANGER};
  height: 100%;
`;
