import React, { useState } from "react";
import { TModalController } from "../../Hooks/UseModal";
import styled from "styled-components";
import useFileUpload from "../../Hooks/UseFileUpload";
import { UploadVideoModal } from "../../Components/UploadVideoModal";
import { MdCloudUpload } from "react-icons/md";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useService from "../../Hooks/UseService";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import * as yup from "yup";
import {
  transcribeVideoService,
  uploadLinkService,
  uploadVideoService,
} from "../../Services/Video";
import Notify from "../../Store/Actions/NotifyAction";
import { colors } from "../../Theme";
import { Formik, Form } from "formik";
import { FormField } from "../../Components/Forms";
import { Button } from "../../Styles/styles.global";

const validationSchema = yup.object().shape({
  url: yup
    .string()
    .required("Paste your url")
    .test(
      "Not a valid link",
      "Link should start with *https://*",
      (val?: string | null) => {
        return !!val && val.startsWith("https://");
      }
    ),
});

type TFormData = {
  url: string;
};

interface TUploadVideoProps {
  controller: TModalController;
}

const UploadVideo: React.FC<TUploadVideoProps> = ({ controller }) => {
  const dispatch = useDispatch();
  const uploadVideo = useService(uploadVideoService);
  const transcribeVideo = useService(transcribeVideoService);
  const uploadLink = useService(uploadLinkService);
  const [local, setLocal] = useState(true);
  const history = useHistory();
  const upload = useFileUpload({
    mimeTypes: ["video/mp4", "video/mov", "video/avi"],
    maxSize: 100 * 1024 * 1024,
  });
  const [progress, setProgress] = React.useState(0);

  const Submit = () => {
    uploadVideo
      .call(upload?.file!)
      .onSuccess((data) => {
        transcribeVideo.call(data?.slug);
        history.push("/videos");
      })
      .onError((err) => {
        dispatch(Notify.error(err.message));
      });
  };

  const onSubmit = (val: TFormData) => {
    uploadLink
      .call(val.url)
      .onSuccess((res: any) => {
        transcribeVideo.call(res?.slug);
        history.push("/videos");
      })
      .onError((err) => {
        dispatch(Notify.error(err.message));
      });
  };


  return (
    <UploadVideoModal
      title={local ? `Upload a Video File` : "Upload a Video Link"}
      controller={controller}
    >
      {local ? (
        <UploadArea
          increase={!!upload.file}
          onDrop={upload.onDrop}
          onDragLeave={upload.onDragLeave}
          onDragOver={upload.onDragOver}
          highlightDragover={upload.dragState}
        >
          <VideoContainer>
            {upload.file && (
              <Video controls src={URL.createObjectURL(upload.file)} />
            )}
          </VideoContainer>

          <MdCloudUpload size={50} color={colors.PRIMARY} />

          <DragText hide={!!upload.file}>
            Click to browse or drag and drop
            <br /> your video file here
          </DragText>

          {!upload.file && (
            <Input
              type="file"
              name="video"
              accept=".mp4, .mov, .avi"
              onChange={upload.onChange}
            />
          )}

          {upload.file && (
            <ClearButton onClick={upload.clear}>
              Remove <FaTrashAlt />
            </ClearButton>
          )}

          {upload.file && (
            <UploadButton
              onClick={() => {
                !uploadVideo.isLoading && Submit();
              }}
            >
              {uploadVideo.isLoading ? <ButtonLoader size={15} /> : "Upload"}{" "}
              <FaUpload />
            </UploadButton>
          )}

        </UploadArea>
      ) : (
        <Formik<TFormData>
          initialValues={{ url: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <StyledForm>
                <FormField
                  id="url"
                  name="url"
                  placeholder="Paste your video link here"
                  type="text"
                />
                {/* <Note>
                  Start link with <b>https://</b>
                </Note> */}

                <Button
                  type="submit"
                  disabled={uploadLink.isLoading}
                  margin="1rem 0 0"
                >
                  {uploadLink.isLoading ? <ButtonLoader size={15} /> : "Upload"}
                </Button>
              </StyledForm>
            );
          }}
        </Formik>
      )}
         
      <Notice>
      {upload.file && uploadVideo.isLoading && <VideoProgressBar>
        {/* {uploadLink.isLoading && <LinearProgress />} */}
        <LinearProgress />
        </VideoProgressBar>}

        Accepted video formats include .mp4, .mov, .avi <br /> up to 100mb file
        size.
      </Notice>
      <ViaLinkCover onClick={() => setLocal(!local)}>
        <ViaLink>
          {local ? "Upload video via Link" : "Upload video via local device"}
        </ViaLink>
      </ViaLinkCover>
    </UploadVideoModal>
  );
};

export default UploadVideo;

type IUploadArea = {
  increase: boolean;
  highlightDragover?: boolean;
};
const UploadArea = styled.div<IUploadArea>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ increase }) => (increase ? "250px" : "150px")};
  max-width: 456px;
  width: 100%;
  border: ${({ theme, highlightDragover }) =>
    highlightDragover
      ? `2px solid ${theme.colors.PRIMARY}`
      : `1px dashed ${theme.colors.SECONDARY}`};
  border-radius: 3.75px;
  margin: ${({ increase }) => (increase ? "0" : "1rem 0")};

  &:hover {
    opacity: 0.8;
  }
`;

// const Note = styled.p`
//   text-align: start;
//   margin-top: 3px;
//   font-size: 11px;
//   color: ${({ theme }) => theme.colors.GREY};
// `;

const StyledForm = styled(Form)`
  width: 70%;
`;

const Video = styled.video`
  width: 100%;
  height: 220px;
`;

const ViaLinkCover = styled.div`
  width: fit-content;
`;
const ViaLink = styled.p`
  color: ${({ theme }) => theme.colors.BG_PRIMARY};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  text-decoration: underline;
  cursor: pointer;
`;

const VideoContainer = styled.div`
  width: 100%;
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0;
`;

const DragText = styled.p<{ hide: boolean }>`
  display: ${({ hide }) => hide && "none"};
  font-size: 12px;
  font-weight: normal;
`;

const Notice = styled.p`
  font-size: 12px;
  font-weight: normal;
  width: 80%;
`;
const VideoProgressBar = styled.div`
    padding-bottom: 10px;
    width: 100%;
`;
const UploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.PRIMARY};
  color: ${({ theme }) => theme.colors.WHITE};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  position: absolute;
  bottom: 5px;
  right: 10px;
  border-radius: 5px;
  border: none;
  padding: 3px 10px;

  width: 5rem;
  cursor: pointer;
  font-size: 12px;
`;

const ClearButton = styled(UploadButton)`
  left: 10px;
  background-color: ${({ theme }) => theme.colors.DANGER};
  width: 5.25rem;
`;

const ButtonLoader = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    .MuiCircularProgress-svg {
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
`;
