/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@material-ui/core";
// import Backdrop from "@material-ui/core/Backdrop";
import Slider from "@material-ui/core/Slider";
import { Form, Formik } from "formik";
// import { current } from "@reduxjs/toolkit";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Scales } from "../Config/constant";
// import environment from "../Config/Environment";
import { GifViewModal } from "./Modal/GifViewModal";
import UseJobId from "../Hooks/UseJobId";
import useModal from "../Hooks/UseModal";
import useService from "../Hooks/UseService";
import { MakeGifService } from "../Services/Video";
import { ConvertTimeToSeconds } from "../Utils/ConvertTimeToSeconds";
// import { getVideoResultService, trimVideoService } from "../Services/Video";
// import Notify from "../Store/Actions/NotifyAction";
// import { currentVideo, fetchAllVideos } from "../Store/Actions/VideoAction";
import { convertSecondsToTime } from "../Utils/secondsToTimeConverter";
import MySelect from "./Forms/MySelectField";
import { ProgressContext } from "./ProgressContext";
import TrimmedSlider from "./TrimmedSlider";

// const { veegixIp } = environment;

export type TFormData = {
  scale: number | null;
};

const TrimmedVideo: React.FC<{
  video: HTMLVideoElement;
}> = ({ video: OldVideo }) => {
  const makeGifCall = useService(MakeGifService);
  const gifModal = useModal<{ url: any }>();

  // const trimVideo = useService(trimVideoService);
  // const getVideoResult = useService(getVideoResultService);
  const slug = localStorage.getItem("slug");
  const {
    // setProgressDisabled,
    editInfo,
    setEditInfo,
    progressData,
  } = useContext(ProgressContext);
  const { existingJobId } = UseJobId();

  const { pathname } = useLocation();

  // const [progress, setProgress] = useState(0);
  // const [isTrimLoading, setTrimLoading] = useState(false);
  // const dispatch = useDispatch();
  const [range, setRange] = useState({ min: 0, max: 100 });
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");
  const position = convertSecondsToTime(OldVideo?.currentTime ?? 0);
  const fullDuration = convertSecondsToTime(
    OldVideo?.duration!.toString() === "NaN" ? 0 : OldVideo?.duration!
  );
  const [timeFrom, setTimeFrom] = useState(0);
  // const [timePercent, setTimePercent] = useState(0);
  // const [timeToPercent, setTimeToPercent] = useState(100);
  const [timePercent] = useState(0);
  const [timeToPercent] = useState(100);
  const [timeTo, setTimeTo] = useState(parseInt(fullDuration));

  const fromTime = useMemo(() => timeFrom, [timeFrom]);
  const toTime = useMemo(() => timeTo, [timeTo]);
  const fromPercent = useMemo(() => timePercent, [timePercent]);
  const toPercent = useMemo(() => timeToPercent, [timeToPercent]);
  const videoEl = useMemo(() => OldVideo, [OldVideo?.currentTime]);

  const data = {
    original: slug!,
    id: existingJobId!,
    clip: editInfo?.clip!,
    resize: true,
    start_time: editInfo?.start_time!,
    end_time: editInfo?.end_time!,
    ratio: editInfo?.ratio!,
    dimensions: editInfo?.dimensions!,
  };

  useEffect(() => {
    const newTime = progressData?.start_time
      ? progressData.start_time
      : "00:00:00";
    const newEndTime = progressData?.end_time
      ? progressData.end_time
      : fullDuration;

    setStartTime(newTime);
    setEndTime(newEndTime);

    const convertedTime = progressData?.start_time
      ? ConvertTimeToSeconds(progressData.start_time)
      : 0;

    const convertedEndTime = progressData?.end_time
      ? ConvertTimeToSeconds(progressData.end_time)
      : 100;

    const calc = (convertedTime / OldVideo?.duration!) * 100;

    const endCalc = (convertedEndTime / OldVideo?.duration!) * 100;

    setRange({ min: calc, max: endCalc });
  }, [progressData?.start_time, OldVideo?.duration, progressData?.start_time]);

  useEffect(() => {
    // if (!OldVideo) return;

    // OldVideo.currentTime = parseInt(startTime); //not sure if player seeks to seconds or milliseconds

    const stopVideoAfter = (parseInt(endTime) - parseInt(startTime)) * 1000; //* 1000, because Timer is in ms
    setTimeout(function () {
      OldVideo?.pause();
    }, stopVideoAfter);
  }, [OldVideo, startTime, endTime]);

  useEffect(() => {
    const newTime = progressData?.end_time
      ? progressData.end_time
      : fullDuration;
    setEndTime(newTime);

    const convertedTime = progressData?.end_time
      ? ConvertTimeToSeconds(progressData.end_time)
      : OldVideo?.duration!;

    const calc = (convertedTime / OldVideo?.duration!) * 100;

    setRange({ ...range, max: calc });
  }, [OldVideo?.duration, progressData?.end_time]);

  const handleStartTimeChange = () => {
    setStartTime(position);
    if (OldVideo) {
      const calc = (OldVideo.currentTime * 100) / OldVideo?.duration;

      setRange({ ...range, min: calc });
    }
  };

  const handleEndTimeChange = () => {
    setEndTime(position);

    if (OldVideo) {
      const calc = (OldVideo.currentTime * 100) / OldVideo?.duration;

      setRange({ ...range, max: calc });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number[] | number
  ) => {
    if (newValue instanceof Array) {
      const current = (OldVideo?.duration! * newValue[0]) / 100;
      setTimeFrom(current);
      // setTimePercent(newValue[0]);
      // setTimeToPercent(newValue[1]);

      // if (pathname === "/edit") {
      //   setProgressDisabled?.(true);
      // }

      setEditInfo?.({
        ...data,
        clip: true,
        start_time: startTime,
        end_time: endTime,
      });

      if (OldVideo) {
        OldVideo.currentTime = current;
      }
      const final = (OldVideo?.duration! * newValue[1]) / 100;
      setStartTime(convertSecondsToTime(current));
      setEndTime(convertSecondsToTime(final));

      setTimeTo(final);

      setRange({
        min: newValue[0],
        max: isNaN(newValue[1]) ? 100 : newValue[1],
      });
    }
  };

  const submitForm = (value: TFormData) => {
    makeGifCall
      .call(
        startTime,
        endTime,
        (value?.scale as any).value,
        existingJobId ? existingJobId! : slug!,
        existingJobId ? true : false
      )
      .onSuccess((res: any) => {
        gifModal.open({ url: `data:image/png;base64,${res?.gif}` });
      })
      .onError((err) => {});
  };

  useEffect(() => {
    // const diff = OldVideo?.currentTime! - timeFrom;
    // const newDuration = Math.floor(timeTo - timeFrom);
    // const play = (diff * 100) / newDuration;

    if (OldVideo?.currentTime! < timeFrom && timeFrom! > 0) {
      OldVideo?.pause();
    }

    if (OldVideo?.currentTime! > timeTo && timeTo! > 0) {
      if (OldVideo) {
        OldVideo.currentTime = timeFrom;
      }
    }
  }, [OldVideo?.currentTime, OldVideo?.duration, startTime, endTime]);

  // const trim = () => {
  //   existingJobId
  //     ? trimVideo
  //         .call(existingJobId, startTime, endTime, true)
  //         .onSuccess((data: any) => {
  //           setTrimLoading(true);
  //           if (data.error) {
  //           } else {
  //             setTimeout(() => {
  //               getVideoResult
  //                 .call(data?.job)
  //                 .onSuccess((res) => {
  //                   if (!res.complete) {
  //                     // setProgress(res.progress);
  //                     setTimeout(() => {
  //                       getVideoResult.call(data?.job);
  //                     }, 5000);
  //                   } else {
  //                     setTrimLoading(false);
  //                     dispatch(Notify.success("Video trimmed successfully"));
  //                     dispatch(
  //                       currentVideo({
  //                         video: `${veegixIp}${res?.url}`,
  //                       })
  //                     );
  //                     dispatch(fetchAllVideos());
  //                     if (OldVideo) {
  //                       OldVideo.pause();
  //                       OldVideo.currentTime = 0;
  //                     }
  //                   }
  //                 })
  //                 .onError(() => {});
  //             }, 5000);
  //           }
  //         })
  //     : trimVideo
  //         .call(slug!, startTime, endTime, false)
  //         .onSuccess((data) => {
  //           setTrimLoading(true);
  //           if (data.error) {
  //           } else {
  //             persistor(data?.job);
  //             setTimeout(() => {
  //               getVideoResult
  //                 .call(data?.job)
  //                 .onSuccess((res) => {
  //                   if (!res.complete) {
  //                     // setProgress(res.progress);
  //                     setTimeout(() => {
  //                       getVideoResult.call(data?.job);
  //                     }, 5000);
  //                   } else {
  //                     setTrimLoading(false);
  //                     dispatch(Notify.success("Video trimmed successfully"));
  //                     dispatch(
  //                       currentVideo({
  //                         video: `${veegixIp}${res?.url}`,
  //                       })
  //                     );
  //                     dispatch(fetchAllVideos());
  //                     if (OldVideo) {
  //                       OldVideo.pause();
  //                       OldVideo.currentTime = 0;
  //                     }
  //                   }
  //                 })
  //                 .onError(() => {});
  //             }, 5000);
  //           }
  //         })
  //         .onError((error) => {});
  // };

  // const isLoading = trimVideo.isLoading || isTrimLoading;

  return (
    <>
      <TrimmedSlider
        timeFrom={fromTime}
        timeTo={toTime}
        timePercent={fromPercent}
        timeToPercent={toPercent}
        video={videoEl}
        currentTime={videoEl?.currentTime}
      />
      <Formik<TFormData>
        initialValues={{ scale: null }}
        onSubmit={submitForm}
        enableReinitialize
      >
        {(formikProps) => {
          return (
            <StyledForm>
              <TrimContainer gif={pathname === "/edit/make-gif"}>
                {/* <StyledBackdrop open={isLoading}>
          {isLoading && (
            <LoaderCover>
              <CircularLoader size={55} />{" "}
              <LoaderText>Trimming Video...</LoaderText>
            </LoaderCover>
          )}
        </StyledBackdrop> */}
                <TimeContainer>
                  <Header>
                    {pathname !== "/edit/make-gif"
                      ? "Set Trim Range"
                      : "Set Range"}
                  </Header>

                  <div>
                    <StyledSlider
                      // min={video?.currentTime}
                      // max={video?.duration}
                      min={0}
                      max={100}
                      value={[range.min, range?.max!]}
                      onChange={handleChange}
                      valueLabelDisplay="off"
                      aria-labelledby="range-slider"
                    />
                  </div>

                  <TimeCover>
                    <Start>
                      <Button onClick={handleStartTimeChange}>
                        Start Time
                      </Button>
                      <Time>{startTime}</Time>
                    </Start>

                    <End>
                      <Button onClick={handleEndTimeChange}>End Time</Button>
                      <Time>
                        {endTime === "NaN:NaN:NaN"
                          ? convertSecondsToTime(OldVideo.duration)
                          : endTime}
                      </Time>
                    </End>
                  </TimeCover>
                </TimeContainer>
                {pathname === "/edit/make-gif" && (
                  <ScaleContainer gif={pathname === "/edit/make-gif"}>
                    <MySelect
                      options={Scales}
                      getName={(option) => option.key}
                      getValue={(option) => option.value}
                      name="scale"
                      placeholder="Choose video scale"
                      disabled={makeGifCall.isLoading}
                      label="Choose Scale"
                      wrapMargin="2rem 0 1rem"
                      width="95%"
                    />
                    <TrimButton
                      type="submit"
                      id="bottom"
                      disabled={makeGifCall.isLoading}
                    >
                      {makeGifCall.isLoading ? (
                        <ButtonLoader size={15} />
                      ) : (
                        "Make Gif"
                      )}
                    </TrimButton>
                  </ScaleContainer>
                )}
              </TrimContainer>
            </StyledForm>
          );
        }}
      </Formik>

      <GifViewModal controller={gifModal} />
    </>
  );
};

export default TrimmedVideo;

const TrimContainer = styled.div<{ gif?: boolean }>`
  padding: ${({ gif }) => !gif && "2rem 0 1rem"};
  width: ${({ gif }) => (!gif ? "100%" : "90%")};
  margin: auto;
`;

const TimeContainer = styled.div`
  width: 100%;
`;

const StyledForm = styled(Form)``;

const ScaleContainer = styled.div<{ gif?: boolean }>`
  width: 100%;
`;

const Header = styled.p`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const TimeCover = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Start = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const End = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Button = styled.button`
  margin-right: 10px;
  cursor: pointer;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    margin-bottom: 10px;
  }
`;

const Time = styled.p`
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  padding: 1px 3px;
`;

const TrimButton = styled.button`
  color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 5px;
  padding: 3px 10px;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  cursor: pointer;
  border: 1px solid;
  ${({ theme }) => theme.colors.PRIMARY_DARK};
  background: ${({ theme }) => theme.colors.PRIMARY_DARK};
  width: 100px;
  height: 30px;
  position: relative;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

const ButtonLoader = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    .MuiCircularProgress-svg {
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
`;

const StyledSlider = styled(Slider)`
  &.MuiSlider-root {
    color: ${({ theme }) => theme.colors.DANGER};
  }
`;

// const StyledBackdrop = styled(Backdrop)`
//   padding-top: 2rem;
//   position: absolute;
//   border-radius: 20px;
//   width: 100%;
//   z-index: 100 !important;
//   height: 100%;
//   background-color: #fffcff80;
// `;

// const ProgressView = styled.div`
//   width: 130px;
//   height: 130px;
//   background-color: ${({ theme }) => theme.colors.WHITE};
//   border: 12px solid ${({ theme }) => theme.colors.GREY};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 100%;
//   transition: all 1s ease;
// `;

// const ProgressText = styled.p`
//   font-size: 30px;
//   font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
// `;

// const CircularLoader = styled(CircularProgress)`
//   &.MuiCircularProgress-root {
//     .MuiCircularProgress-svg {
//       color: ${({ theme }) => theme.colors.WHITE};
//     }
//   }
//   margin-bottom: 1rem;
// `;

export const LoaderCover = styled.div`
  text-align: center;
`;

export const LoaderText = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.WHITE};
`;
