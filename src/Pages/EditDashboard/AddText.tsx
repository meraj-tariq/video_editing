/* eslint-disable react-hooks/exhaustive-deps */

import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import { SubmitButton } from "../../Components/Forms";
import MySelect from "../../Components/Forms/MySelectField";
import VideoControllers from "../../Components/VideoControllers";
import { Positions } from "../../Config/constant";
import environment from "../../Config/Environment";
import useFileUpload from "../../Hooks/UseFileUpload";
import UseJobId from "../../Hooks/UseJobId";
import useService from "../../Hooks/UseService";
import {
  getVideoResultService,
  getWatermarkService,
  postWatermarkService,
  uploadWatermarkLogoService,
} from "../../Services/Video";
import { fetchUserDetails } from "../../Store/Actions/Auth";
import Notify from "../../Store/Actions/NotifyAction";
import { currentVideo, fetchAllVideos } from "../../Store/Actions/VideoAction";
import { Button } from "../../Styles/styles.global";
// import { TVideo } from "../../Types/Video";
import { Root } from "./styles";
import downloadBase64File from "../../Utils/DownloadImage";

const { veegixIp } = environment;

enum View {
  upload = "upload",
  newImage = "new-image",
}

type TFormData = {
  position: string;
};

export default function AddText() {
  const dispatch = useDispatch();
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [isResultLoading, setResultLoading] = useState(false);
  const getWatermark = useService(getWatermarkService);
  const getVideoResult = useService(getVideoResultService);
  const watermarkLogo = useService(uploadWatermarkLogoService);
  const postWatermark = useService(postWatermarkService);
  const [currentTab, setCurrentTab] = useState(View.upload);
  const { existingJobId, persistor } = UseJobId();
  // const canvas = canvasRef?.current!;
  // const ctx = canvas?.getContext("2d")!;
  const slug = localStorage.getItem("slug");
  const upload = useFileUpload({
    mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
  });

  const handleSetTab = (tab: React.SetStateAction<View>) => setCurrentTab(tab);

  const videoUrl = useSelector((state) => state.video.CurrentVideoReducer.url);
  const userInfo = useSelector((state) => state.Auth.user_info!);

  const uploadLogo = () => {
    watermarkLogo.call(upload.file!).onSuccess(() => {
      dispatch(Notify.success("Watermark Logo Updated"));
      upload.clear();
    });
  };

  const downloadWatermark = () => {
    getWatermark.call().onSuccess((water) => {
      downloadBase64File("image/png", water?.watermark, "watermarked-video");
    });
  };

  const submitForm = (values: TFormData) => {
    const id = existingJobId ?? slug;
    const isJob = existingJobId ? true : false;
    const options = {
      // x_offset: 10,
      // y_offset: 10,
      position: ((values.position as unknown) as { value: string })?.value,
    };
    postWatermark.call(id!, options, isJob).onSuccess((data) => {
      if (data.error) {
      } else {
        setTimeout(() => {
          if (!existingJobId) {
            persistor(data?.job);
          }
          getVideoResult
            .call(data?.job)
            .onSuccess((res) => {
              // setProgress(0);
              if (!res.complete) {
                // setProgress(res.progress);
                setResultLoading(true);
                setTimeout(() => {
                  getVideoResult.call(data?.job);
                }, 10000);
              } else {
                dispatch(Notify.success("Watermark added successfully"));
                dispatch(
                  currentVideo({
                    video: `${veegixIp}${res?.url}`,
                  })
                );
                setResultLoading(false);
                videoEl?.pause();
              }
            })
            .onError(() => {});
        }, 5000);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllVideos());
    dispatch(fetchUserDetails());
  }, []);

  // const drawText = useCallback(() => {
  //   if (!ctx || !values.txt) return;

  //   ctx.textAlign = "start";
  //   ctx.textBaseline = "alphabetic";
  //   ctx.font = "20px Arial";

  //   ctx.fillStyle = `${values.bgColor}`;
  //   ctx.fillRect(30, 10, 440, 40);

  //   ctx.fillStyle = `${values.color}`;
  //   ctx.fillText(values.txt, 120, 37);
  // }, [values]);

  // useEffect(() => {
  //   if (ctx) {
  //     ctx.canvas.width = 500;
  //     ctx.canvas.height = 500;
  //   }
  //   drawText();
  // }, [drawText]);

  const isDownloadable =
    currentTab === View.upload && userInfo.subscription?.type === "pro";

  return (
    <Root>
      <WorkSpace>
        <EditArea>
          <EditAreaTabCover>
            <Tab
              active={currentTab === View.upload}
              onClick={() => handleSetTab(View.upload)}
            >
              Set Watermark Image
            </Tab>
            {userInfo.subscription?.type === "pro" && (
              <Tab
                active={currentTab === View.newImage}
                onClick={() => handleSetTab(View.newImage)}
              >
                Upload Image
              </Tab>
            )}
          </EditAreaTabCover>
          {currentTab === View.upload && (
            <Formik<TFormData>
              initialValues={{ position: "" }}
              onSubmit={submitForm}
            >
              {() => {
                return (
                  <StyledForm>
                    <FieldCover>
                      <MySelect
                        options={Positions}
                        getName={(option) => option.name}
                        getValue={(option) => option.value}
                        name="position"
                        placeholder="Choose position"
                        label="Choose Position"
                        margin="5px 0 10px"
                      />{" "}
                    </FieldCover>

                    <ButtonCover>
                      <SubmitButton
                        disabled={postWatermark.isLoading || isResultLoading}
                        title="Set Watermark"
                        width="138px"
                        isLoading={postWatermark.isLoading || isResultLoading}
                      />
                    </ButtonCover>
                  </StyledForm>
                );
              }}
            </Formik>
          )}

          {isDownloadable && (
            <StyledButton
              disabled={watermarkLogo.isLoading}
              onClick={downloadWatermark}
              type="button"
            >
              Download
            </StyledButton>
          )}

          {currentTab === View.newImage && (
            <FieldForm>
              <FieldCover>
                <Label>Upload Image</Label>
                <StyledField
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="file"
                  onChange={upload.onChange}
                />
              </FieldCover>

              <StyledButton
                disabled={watermarkLogo.isLoading}
                onClick={uploadLogo}
                type="button"
              >
                Upload
              </StyledButton>
            </FieldForm>
          )}
        </EditArea>
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
  width: 40%;
  min-width: 365px;
  margin-right: 1rem;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    min-width: 100%;
  }
`;
const PreviewArea = styled.div`
  width: 100%;
`;

const EditAreaTabCover = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.PRIMARY_LIGHT};
  padding: 10px;
`;

const Tab = styled.p<{ active: boolean }>`
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  background: ${({ theme, active }) =>
    active ? theme.colors.PRIMARY_DARK : theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme, active }) =>
    active ? theme.colors.WHITE : theme.colors.PRIMARY_DARK};
  outline: none;
  box-shadow: none;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;

const WorkSpace = styled.div`
  display: flex;
  margin-bottom: 2rem;
  height: 80%;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
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
`;

export const CanvasCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(255, 0, 0, 0.5);
`;

export const Canvas = styled.canvas`
  /* width: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(255, 0, 0, 0.5);
`;

const StyledForm = styled(Form)`
  width: 100%;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    padding: 0 0 1rem;
  }
`;

export const FieldForm = styled.form``;

export const FieldCover = styled.div`
  margin: 20px 0;
`;

export const ButtonCover = styled.div``;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  margin-bottom: 5px;
`;

const StyledButton = styled(Button)`
  margin: 1rem 0;
  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    margin: 0.5rem 0;
  }
`;

const StyledField = styled.input`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  outline: none;
  box-shadow: none;
  width: 90%;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;
