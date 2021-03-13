/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AccountBar from "../../Components/AccountBar";
import environment from "../../Config/Environment";
import { TProgressData } from "../../Types/Video";
import useService from "../../Hooks/UseService";
import {
  deleteVideoService,
  getVideoResultService,
} from "../../Services/Video";
import Notify from "../../Store/Actions/NotifyAction";
import {
  currentVideo,
  fetchAllVideos,
  videoDimensions,
} from "../../Store/Actions/VideoAction";
import { TVideo } from "../../Types/Video";

const { veegixIp } = environment;

const saveNow = (value: TProgressData, videoSlug: string) => {
  if (localStorage.getItem("progress") === null) {
    localStorage.setItem("progress", "[]");
  }
  let existingProgress: TProgressData[] = JSON.parse(
    localStorage.getItem("progress")!
  );

  let filtered = existingProgress?.filter((cb) => cb.slug === videoSlug) ?? [];

  if (filtered?.length > 0) {
    filtered?.forEach((cb, i) => {
      if (cb.slug === videoSlug && i === 0) {
        cb = value;
      }
    });
  } else {
    existingProgress?.push(value);
  }

  localStorage.setItem("progress", JSON.stringify(existingProgress));
};

const AllVideos = () => {
  const dispatch = useDispatch();
  const videosData = useSelector((select) => select.video.FetchAllVideoReducer);
  const deleteVideo = useService(deleteVideoService);
  const getResult = useService(getVideoResultService);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [getResultLoading, setGetResultLoading] = useState(false);

  const history = useHistory();

  let existing: Array<{ slug: string; jobId: string }> = JSON.parse(
    localStorage.getItem("jobIds")!
  );

  if (localStorage.getItem("jobIds") === null) {
    localStorage.setItem("jobIds", "[]");
  }

  useEffect(() => {
    if (localStorage.getItem("jobIds") === null) {
      localStorage.setItem("jobIds", "[]");
    }
    if (localStorage.getItem("progress") === null) {
      localStorage.setItem("progress", "[]");
    }
  }, []);

  const { isVideoLoading, videos } = videosData;

  const removeVideo = (slug: string) => {
    deleteVideo
      .call(slug)
      .onSuccess(() => {
        dispatch(Notify.success("Video deleted successfully"));
        dispatch(fetchAllVideos());
      })
      .onError((err) => {
        dispatch(Notify.error(err?.message));
      });
  };

  const saveSlug = (video: TVideo) => {
    localStorage.setItem("slug", video?.slug);

    if (video?.progress) {
      const dimensions = video.progress.dimensions.split("x");
      getResult.call(Number(video.progress.id)).onSuccess((res) => {
        setGetResultLoading(true);
        if (!res.complete) {
          setGetResultLoading(true);
          setTimeout(() => {
            getResult.call(Number(video.progress.id));
          }, 5000);
        }
        if (res?.url) {
          setGetResultLoading(false);
          const width = parseInt(dimensions[0]);
          const height = parseInt(dimensions[1]);
          const progressValue = {
            slug: video?.slug,
            width,
            height,
            start_time: "",
            end_time: "",
          };

          saveNow(progressValue, video?.slug);

          dispatch(
            currentVideo({
              video: `${veegixIp}${res?.url}`,
            })
          );

          dispatch(
            videoDimensions({
              width: width,
              height: height,
              defaultHeight: height,
              defaultWidth: width,
            })
          );

          history.push("/edit/resize-video");
        }
      });

      if (existing?.length > 0) {
        existing?.forEach((cb) => {
          if (cb.slug === video?.slug) {
            cb.jobId = video.progress.id;
          }
        });
      } else {
        existing?.push({ jobId: video.progress.id, slug: video?.slug });
      }

      localStorage.setItem("jobIds", JSON.stringify(existing));
    } else {
      const dimensions = video.dimensions.split("x");

      const width = parseInt(dimensions[0]);
      const height = parseInt(dimensions[1]);

      dispatch(
        currentVideo({
          video: video?.s3_url,
        })
      );

      const progressValue = {
        slug: video?.slug,
        width,
        height,
        start_time: "",
        end_time: "",
      };

      saveNow(progressValue, video?.slug);

      dispatch(
        videoDimensions({
          width: width,
          height: height,
          defaultHeight: height,
          defaultWidth: width,
        })
      );
      history.push("/edit/resize-video");
    }
  };

  useEffect(() => {
    dispatch(fetchAllVideos());
  }, []);
  const isLoading =
    deleteVideo.isLoading || getResultLoading || getResult.isLoading;
  return (
    <AccountBar videos>
      <StyledBackdrop open={isLoading}>
        {isLoading && (
          <LoaderCover>
            <CircularLoader size={55} />{" "}
          </LoaderCover>
        )}
      </StyledBackdrop>
      <Container>
        {videos.length > 0 ? (
          videos?.map((video: TVideo, i) =>
            isVideoLoading ? (
              <React.Fragment key={video.id}>
                <StyledSkeleton variant="rect" width="32%" height={240} />
              </React.Fragment>
            ) : (
              <Card key={video.id}>
                <Video controls ref={videoRef} src={video?.s3_url} />

                <BottomSection>
                  <Text>
                    {video?.created_at &&
                      format(new Date(video?.created_at), "LLL d, yyyy")}
                  </Text>

                  <ToolCover>
                    <ClearButton onClick={() => removeVideo(video?.slug)}>
                      Delete <FaTrashAlt />
                    </ClearButton>
                    <div onClick={() => saveSlug(video)}>
                      <EditButton type="button">
                        Edit <FaEdit />
                      </EditButton>
                    </div>
                  </ToolCover>
                </BottomSection>
              </Card>
            )
          )
        ) : (
          <p>You currently have no uploaded video</p>
        )}
      </Container>
    </AccountBar>
  );
};

export default AllVideos;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  width: 100%;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  padding: 1rem;
  padding-top: 0;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 0.5rem;
  height: fit-content;
`;

const Video = styled.video`
  width: 100%;
  height: 220px;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;
`;

const Text = styled.p`
  ${({ theme }) => theme.colors.PRIMARY_TEXT}
`;

const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.PRIMARY};
  color: ${({ theme }) => theme.colors.WHITE};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  border-radius: 5px;
  border: none;
  padding: 3px 10px;

  cursor: pointer;
  font-size: 12px;
`;

export const StyledSkeleton = styled(Skeleton)`
  margin: 0.5rem;
  min-width: 250px;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    width: 100%;
    min-width: 100%;
  }
`;

const ClearButton = styled.button`
  background-color: ${({ theme }) => theme.colors.DANGER};
  width: 5.25rem;
  color: ${({ theme }) => theme.colors.WHITE};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;
  border: none;
  padding: 3px 10px;
  margin-right: 15px;

  cursor: pointer;
  font-size: 12px;
`;

const ToolCover = styled.div`
  display: flex;
`;
const StyledBackdrop = styled(Backdrop)`
  padding-top: 2rem;
  position: absolute;
  border-radius: 20px;
  width: 100%;
  z-index: 100 !important;
  height: 100%;
  background-color: #fffcff80;
`;

const CircularLoader = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    .MuiCircularProgress-svg {
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
  margin-bottom: 1rem;
`;

export const LoaderCover = styled.div`
  text-align: center;
`;

export const LoaderText = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.WHITE};
`;
