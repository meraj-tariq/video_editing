/* eslint-disable react-hooks/exhaustive-deps */
import Backdrop from "@material-ui/core/Backdrop";
import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { RiAddFill, RiDeleteBinLine } from "react-icons/ri";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import {
  FormField,
  SubmitButton,
  TextAreaField,
  TimeField,
} from "../../Components/Forms";
import MySelect from "../../Components/Forms/MySelectField";
import VideoControllers from "../../Components/VideoControllers";
import { fonts, fontSizes } from "../../Config/constant";
import environment from "../../Config/Environment";
import useFileUpload from "../../Hooks/UseFileUpload";
import useService from "../../Hooks/UseService";
import {
  burnSrtService,
  downloadSubtitleService,
  geSubtitleService,
  getLanguageService,
  getVideoResultService,
  postLanguageService,
} from "../../Services/Video";
import Notify from "../../Store/Actions/NotifyAction";
import { currentVideo, fetchAllVideos } from "../../Store/Actions/VideoAction";
import { TSubtitle } from "../../Types/Video";
import { Root } from "./styles";
import UseJobId from "../../Hooks/UseJobId";
import useWindowSize from "../../Hooks/UseWindowSize";

enum View {
  translate = "translate",
  styles = "style",
  upload = "upload",
}

type TFormData = {
  subtitle: TSubtitle[];
  font_name: string;
  font_size: string;
  color: string;
  language: string;
};

const { veegixIp } = environment;

export default function AddSubtitles() {
  const dispatch = useDispatch();
  const { persistor, existingJobId } = UseJobId();
  const burnSrt = useService(burnSrtService);
  const getSubtitle = useService(geSubtitleService);
  const getVideoResult = useService(getVideoResultService);
  const downloadSrt = useService(downloadSubtitleService);
  const getLanguage = useService(getLanguageService);
  const translateLanguage = useService(postLanguageService);
  const slug = localStorage.getItem("slug");
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [resultLoading, setResultLoading] = useState(false);
  const videoUrl = useSelector((state) => state.video.CurrentVideoReducer.url);
  const [currentTab, setCurrentTab] = useState(View.translate);
  const [isCalled, setCalled] = useState("");
  // const [progress, setProgress] = useState(0);
  const [initialValue, setValue] = useState<TFormData>({
    subtitle: [],
    font_name: "",
    font_size: "",
    color: "",
    language: "",
  });
  const [link, setLink] = useState("");

  const [width] = useWindowSize();

  const maxMobileScreenWidth = 767;
  const isMobile = width < maxMobileScreenWidth;

  const upload = useFileUpload({
    mimeTypes: ["application/x-subrip", "application/srt"],
  });

  const handleSetTab = (tab: React.SetStateAction<View>) => setCurrentTab(tab);

  useEffect(() => {
    dispatch(fetchAllVideos());
    getLanguage.call();
  }, []);

  const fetchSubtitle = async () => {
    getSubtitle
      .call(slug!)
      .onSuccess((data) => {
        if (data?.message! === "Transcription job not done") {
          setTimeout(() => {
            getSubtitle.call(slug!);
          }, 60000);
        } else {
        }
        if (data?.error) {
        } else {
          setValue({ ...initialValue, subtitle: data });
        }
      })
      .onError((error) => {
        dispatch(Notify.error(error?.message!));
      });
  };

  useEffect(() => {
    downloadSrt.call(slug!).onSuccess(async (data) => {
      if (data.error) {
      } else {
        const url = window.URL.createObjectURL(
          new Blob([data], { type: "plain/text" })
        );

        setLink(url);
      }
    });
  }, []);

  const submitForm = async (values: TFormData) => {
    values.subtitle.forEach((cb, i) => {
      cb.index = i + 1;
    });

    const options = {
      font_name: (values.font_name as any).key,
      font_size: (values.font_size as any).value,
      font_color: values.color.substring(1),
    };

    const subtitle =
      currentTab === View.upload
        ? (upload.file as File)
        : (values.subtitle as TSubtitle[]);
    const isUpload = currentTab === View.upload;

    values.subtitle.forEach((cb: TSubtitle, i: number) => {
      if (!cb.sentence) {
        values.subtitle.splice(i, 1);
      }
    });

    currentTab === View.translate
      ? translateLanguage
          .call(slug!, values.subtitle, (values.language as any)[0])
          .onSuccess((data) => {
            if (data.error) {
              dispatch(Notify.warning(data.message));
            } else {
              setValue({ ...initialValue, subtitle: data });
            }
          })
          .onError((err) => {
            dispatch(Notify.warning(err?.message));
          })
      : burnSrt
          .call(slug!, subtitle, options, isUpload)
          .onSuccess((burn) => {
            setResultLoading(true);
            if (burn?.error) {
            } else {
              setTimeout(() => {
                if (!existingJobId) {
                  persistor(burn?.job);
                }
                getVideoResult
                  .call(burn?.job)
                  .onSuccess((res) => {
                    // setProgress(0);
                    if (!res.complete) {
                      // setProgress(res.progress);
                      setResultLoading(true);
                      setTimeout(() => {
                        getVideoResult.call(burn?.job);
                      }, 10000);
                    } else {
                      isUpload
                        ? dispatch(
                            Notify.success("Subtitle Uploaded successfully")
                          )
                        : dispatch(
                            Notify.success("Subtitle burnt successfully")
                          );
                      dispatch(
                        currentVideo({
                          video: `${veegixIp}${res?.url}`,
                        })
                      );
                      setResultLoading(false);
                      videoEl?.pause();
                      dispatch(fetchAllVideos());
                    }
                  })
                  .onError(() => {});
              }, 10000);
            }
          })
          .onError((err) => {});
  };

  useEffect(() => {
    fetchSubtitle();
  }, []);

  const isUploading = isCalled === View.upload && resultLoading;
  const isInitializing = resultLoading || burnSrt.isLoading;
  return (
    <Root>
      <StyledBackdrop open={isInitializing}>
        {isInitializing && (
          <LoaderCover>
            <CircularLoader size={55} />{" "}
            <LoaderText>Subtitle Burning...</LoaderText>
          </LoaderCover>
        )}
      </StyledBackdrop>
      <WorkSpace>
        <Formik<TFormData>
          initialValues={initialValue}
          onSubmit={submitForm}
          enableReinitialize
        >
          {(formikProps) => {
            return (
              <StyledForm>
                <EditArea>
                  <EditAreaTabCover>
                    <Tab
                      active={currentTab === View.translate}
                      onClick={() => handleSetTab(View.translate)}
                    >
                      Translate
                    </Tab>
                    <Tab
                      active={currentTab === View.styles}
                      onClick={() => handleSetTab(View.styles)}
                    >
                      Styles
                    </Tab>
                    <Tab
                      active={currentTab === View.upload}
                      onClick={() => handleSetTab(View.upload)}
                    >
                      Upload
                    </Tab>
                  </EditAreaTabCover>
                  {currentTab === View.styles && (
                    <FontStyleCover>
                      <FontLabel>Font Styling</FontLabel>
                      <FontForm>
                        <MySelect
                          options={fonts}
                          getName={(option) => option.font}
                          getValue={(option) => option.key}
                          name="font_name"
                          placeholder="Select fonts"
                          disabled={getSubtitle.isLoading}
                          margin="5px 0 10px"
                          width="120px"
                        />

                        <MySelect
                          options={fontSizes}
                          getName={(option) => option.name}
                          getValue={(option) => option.value}
                          name="font_size"
                          placeholder="Select font size"
                          disabled={getSubtitle.isLoading}
                          margin="5px 0 10px"
                          width="140px"
                        />

                        <FormField
                          height="100%"
                          margin="-2px 0 10px 0 "
                          padding="3px"
                          type="color"
                          name="color"
                        />
                      </FontForm>
                    </FontStyleCover>
                  )}
                  {currentTab === View.translate && (
                    <TranslateCover>
                      <MySelect<any>
                        options={
                          Object.entries(
                            (getLanguage.data?.translation! as Object) ?? {}
                          ) ?? []
                        }
                        getName={(option) => option[1].name}
                        getValue={(option) => option[0]}
                        name="language"
                        placeholder="Select language"
                        disabled={getSubtitle.isLoading}
                        margin="5px 0 10px"
                        label="Select language"
                      />
                    </TranslateCover>
                  )}

                  {currentTab === View.upload && (
                    <UploadSubCover>
                      <StyledField
                        type="file"
                        accept=".vtt,.srt"
                        name="file"
                        onChange={upload.onChange}
                      />
                    </UploadSubCover>
                  )}
                  <div>
                    {currentTab === View.styles && (
                      <div>
                        <SubmitButton
                          title="Burn Subtitle"
                          disabled={resultLoading && isCalled === View.styles}
                          width="100%"
                          isLoading={resultLoading && isCalled === View.styles}
                          onClick={() => setCalled(View.styles)}
                        />
                      </div>
                    )}
                    {currentTab === View.translate && (
                      <SubmitButton
                        title="Translate"
                        disabled={
                          translateLanguage.isLoading ||
                          !formikProps.values.language
                        }
                        width="100%"
                        isLoading={
                          translateLanguage.isLoading ||
                          formikProps.isSubmitting
                        }
                      />
                    )}

                    {currentTab === View.upload && (
                      <div>
                        <SubmitButton
                          title="Upload Subtitle"
                          disabled={!upload.file || isUploading}
                          width="100%"
                          isLoading={isUploading}
                          onClick={() => setCalled(View.upload)}
                        />
                      </div>
                    )}
                  </div>

                  <SubtitleButton type="button">
                    <a href={link} download={`${slug}.srt`}>
                      Download Subtitle
                    </a>
                  </SubtitleButton>
                </EditArea>
                <PreviewArea>
                  {videoUrl && (
                    <EditableVideo src={videoUrl} setVideo={setVideoEl} />
                  )}
                </PreviewArea>

                {isMobile && (
                  <ScrubArea>
                    <VideoControllers video={videoEl!} />
                  </ScrubArea>
                )}
                <Subtitle>
                  <FieldArray name="subtitle">
                    {(helpers) => (
                      <div>
                        {formikProps.values?.subtitle?.length > 0
                          ? formikProps.values?.subtitle?.map(
                              (field, index) => {
                                return (
                                  <SubtitleList key={index}>
                                    <TextAreaField
                                      name={`subtitle[${index}].sentence`}
                                      type="text"
                                      placeholder="Text"
                                    />
                                    <SubtitleTime>
                                      <TimeLeft>
                                        <label>
                                          <StyleTimeIcon />
                                        </label>
                                        <TimeField
                                          name={`subtitle.${index}.start_time`}
                                          placeholder="start time"
                                        />
                                        <Seperator>|</Seperator>
                                        <label>
                                          <StyleTimeIcon />
                                        </label>
                                        <TimeField
                                          name={`subtitle[${index}].end_time`}
                                          placeholder="end time"
                                        />
                                      </TimeLeft>

                                      <TimeRight>
                                        <StyleAddIcon
                                          onClick={() =>
                                            helpers.insert(index, {
                                              index: index,
                                              sentence: "",
                                              start_time: field.start_time,
                                              end_time: field.end_time,
                                            })
                                          }
                                        />
                                        <StyleDeleteIcon
                                          onClick={() => helpers.remove(index)}
                                        />
                                      </TimeRight>
                                    </SubtitleTime>
                                  </SubtitleList>
                                );
                              }
                            )
                          : "Subtitle Loading..."}
                      </div>
                    )}
                  </FieldArray>
                </Subtitle>
              </StyledForm>
            );
          }}
        </Formik>
      </WorkSpace>

      {!isMobile && (
        <ScrubArea>
          <VideoControllers video={videoEl!} />
        </ScrubArea>
      )}
    </Root>
  );
}

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    flex-direction: column;
    padding: 0 0 1rem;
  }
`;
const EditArea = styled.div`
  width: 30%;
  min-width: 300px;
  margin-right: 1rem;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
    margin-bottom: 1rem;
  }
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

const FontLabel = styled.p``;

const PreviewArea = styled.div`
  width: 50%;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
    height: 25%;
    margin-bottom: 1rem;
  }
`;
const WorkSpace = styled.div`
  display: flex;
  margin-bottom: 2rem;
  height: 80%;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    flex-direction: column;
    height: 100%;
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

const FontStyleCover = styled.div`
  margin: 10px 0 30px;
`;

const FontForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const StyledField = styled.input`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  outline: none;
  box-shadow: none;
  width: -webkit-fill-available;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;

const TranslateCover = styled.div`
  margin: 10px 0 30px;
`;

const UploadSubCover = styled.div`
  margin: 10px 0 30px;
`;

const Subtitle = styled.div`
  width: 35%;
  background: #fff;
  position: relative;
  min-width: 350px;
  height: 100%;
  right: 0;
  overflow: auto;
  margin-left: 1rem;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 5px;
  }

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    height: 100%;
    min-width: 300px;
    width: 100%;
    margin-top: 2rem;
    overflow: unset;
  }
`;

const SubtitleButton = styled.button`
  border: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.WHITE};
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #06bfbf;
  height: 40px;
  width: 100%;
  border-radius: 7.5px;
  font-size: 14px;

  &:focus {
    outline: none;
  }

  a {
    color: ${({ theme }) => theme.colors.WHITE};
    text-decoration: none;
  }
`;

const SubtitleList = styled.div`
  margin: 0 15px 10px 0;
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.GREY};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  padding: 0.5rem;
  outline: none;
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;

const SubtitleTime = styled.div`
  display: flex;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.PRIMARY_DARK};
    padding: 0;
  }
  margin-bottom: 2px;
`;

const TimeLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TimeRight = styled.div`
  display: flex;
  align-items: center;
`;

const Seperator = styled.div`
  color: ${({ theme }) => theme.colors.SECONDARY};
  margin-right: 10px;
  margin-left: 10px;
`;

// const ButtonLoader = styled(CircularProgress)`
//   &.MuiCircularProgress-root {
//     .MuiCircularProgress-svg {
//       color: ${({ theme }) => theme.colors.WHITE};
//     }
//   }
// `;

const StyleTimeIcon = styled(BiTime)`
  margin-right: 3px;
  margin-bottom: -2.5px;
  color: ${({ theme }) => theme.colors.GREY};
`;

const StyleAddIcon = styled(RiAddFill)`
  color: ${({ theme }) => theme.colors.GREY};
  cursor: pointer;
  font-size: 1rem;
  margin-right: 12px;
`;

const StyleDeleteIcon = styled(RiDeleteBinLine)`
  color: ${({ theme }) => theme.colors.GREY};
  cursor: pointer;
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
