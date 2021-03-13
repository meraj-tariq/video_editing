import React, { useContext, useEffect } from "react";
import { TModalController } from "../../Hooks/UseModal";
import styled from "styled-components";
import { UploadVideoModal } from "../../Components/UploadVideoModal";
import { useDispatch } from "react-redux";
import useService from "../../Hooks/UseService";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress } from "@material-ui/core";
import { saveEditProgressService } from "../../Services/Video";

import { Button } from "../../Styles";
import { ProgressContext, TEditInfo } from "../../Components/ProgressContext";
import Notify from "../../Store/Actions/NotifyAction";
import UseSavedProgress from "../../Hooks/UseProgressSaved";

interface TUploadVideoProps {
  controller: TModalController<{ data: TEditInfo }>;
}

const EditProgress: React.FC<TUploadVideoProps> = ({ controller }) => {
  const dispatch = useDispatch();
  const editProgress = useService(saveEditProgressService);
  const slug = localStorage.getItem("slug");
  const { setProgressDisabled, editInfo } = useContext(ProgressContext);
  const { persistor } = UseSavedProgress(editInfo);
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
  }, []);

  const Submit = () => {
    editProgress
      .call(editInfo)
      .onSuccess((res) => {
        if (res?.job) {
          setProgressDisabled?.(false);
          if (existing?.length > 0) {
            existing?.forEach((cb) => {
              if (cb.slug === slug) {
                cb.jobId = res?.job;
              }
            });
          } else {
            existing?.push({ jobId: res?.job, slug: slug! });
          }
          localStorage.setItem("jobIds", JSON.stringify(existing));
          dispatch(Notify.success("Progress Saved"));
          persistor();

          controller.close();
        }
      })
      .onError((err) => {
        dispatch(Notify.error(err?.msg));
      });
  };

  return (
    <UploadVideoModal
      title={`Save your progress`}
      controller={controller}
      width="fit-content"
      height="fit-content"
      padding="3rem"
    >
      <StyledBackdrop open={editProgress.isLoading}>
        {editProgress.isLoading && (
          <LoaderCover>
            <CircularLoader size={55} />{" "}
          </LoaderCover>
        )}
      </StyledBackdrop>
      <Button onClick={Submit}>Save</Button>
    </UploadVideoModal>
  );
};

export default EditProgress;

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
