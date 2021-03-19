/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditableVideo from "../../Components/EditableVideo";
import VideoControllers from "../../Components/VideoControllers";
import { RatioData } from "../../Config/constant";
import UseJobId from "../../Hooks/UseJobId";

import { Button } from "../../Styles/styles.global";
import { Root } from "./styles";
import { ProgressContext } from "../../Components/ProgressContext";
import { videoDimensions } from "../../Store/Actions/VideoAction";
import Select from '@material-ui/core/Select';
enum View {
  ratio = "ratio",
  dimension = "dimension",
}

export default function EditVideo() {
  const dispatch = useDispatch();
  const slug = localStorage.getItem("slug");
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  // const [saveTime, setSaveTime] = useState(video);

  const { videoUrl } = useSelector((state) => ({
    videoUrl: state.video.CurrentVideoReducer.url,
  }));
  const { existingJobId } = UseJobId();
  const [currentTab, setCurrentTab] = useState(View.ratio);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [cropState, setCropState] = useState("default");

  const {
    editInfo,
    setEditInfo,
    // setProgressDisabled,
    progressData,
  } = useContext(ProgressContext);

  const defaultWidth = progressData?.width!;
  const defaultHeight = progressData?.height!;

  const data = {
    original: slug!,
    id: existingJobId!,
    clip: editInfo?.clip!,
    resize: true,
    start_time: editInfo?.start_time!,
    end_time: editInfo?.end_time!,
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const saveDimensionToRedux = () => {
    // setProgressDisabled?.(true);

    dispatch(
      videoDimensions({
        width: parseInt(width),
        height: parseInt(height)!,
        defaultHeight: defaultHeight!,
        defaultWidth: defaultWidth!,
      })
    );

    setEditInfo?.({
      ...data,
      dimensions: { x: parseInt(width)!, y: parseInt(height)! },
    });
    videoEl?.play();
  };

  // const resetDimension = () => {
  //   setWidth("");
  //   setHeight("");

  // };

  const getNewSize = (
    width: number,
    height: number,
    ratioX: number,
    ratioY: number
  ) => {
    const obj: { width?: number; height?: number } = {};
    if (ratioX > ratioY) {
      height = Math.ceil((width * ratioY) / ratioX);
      obj.width = width;
      obj.height = height % 2 === 0 ? height : height + 1;
    } else if (ratioY > ratioX) {
      width = Math.ceil((height * ratioX) / ratioY);
      obj.height = height;
      obj.width = width % 2 === 0 ? width : width + 1;
    } else {
      obj.width = width;
      obj.height = height;
    }

    dispatch(
      videoDimensions({
        width: obj.width,
        height: obj.height,
        defaultHeight: defaultHeight!,
        defaultWidth: defaultWidth!,
      })
    );

    return obj;
  };

  const handleSetTab = (tab: React.SetStateAction<View>) => setCurrentTab(tab);

  const toggleCropState = (value: string) => {
    if (!videoEl?.paused) {
      videoEl?.pause();
    }
    setCropState(value);
    const cropSizes = value.split(":");
    // setProgressDisabled?.(true);

    setEditInfo?.({
      ...data,
      ratio: { x: parseInt(cropSizes[0])!, y: parseInt(cropSizes[1])! },
    });

    if (value === "default") {
      dispatch(
        videoDimensions({
          width: defaultWidth!,
          height: defaultHeight!,
          defaultHeight: defaultHeight!,
          defaultWidth: defaultWidth!,
        })
      );
      if (videoEl) {
        videoEl.currentTime = videoEl.currentTime;
      }
    } else {
      getNewSize(
        defaultWidth!,
        defaultHeight!,
        parseInt(cropSizes[0]),
        parseInt(cropSizes[1])
      );

      if (videoEl) {
        videoEl.currentTime = videoEl.currentTime;
      }
    }
  };
  const [value, setValue] = React.useState([]);
  const onChangeAspectRatio = (event: any)=>{
    setValue(event.target.value);
  }
 
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  return (
    <Root>
      <WorkSpace>
        <EditArea>
          <ResizeTitle>Resize Video</ResizeTitle>
          <EditAreaTabCover>
            <Tab
              active={currentTab === View.ratio}
              onClick={() => {
                handleSetTab(View.ratio);
              }}
            >
              Aspect Ratios
            </Tab>
            <Tab
              active={currentTab === View.dimension}
              onClick={() => {
                handleSetTab(View.dimension);
              }}
            >
              Dimensions
            </Tab>
          </EditAreaTabCover>
          {currentTab === View.ratio && (
            <ResizeOptionArea>
              {RatioData.map((ratio) => (
                <OptionWrapper
                  onClick={() => toggleCropState(ratio.value)}
                  selected={cropState === ratio.value}
                  key={ratio.key}
                >
                  <OptionButton
                    selected={cropState === ratio.value}
                    aspect_ratio={ratio.value}
                  ></OptionButton>
                  <OptionText selected={cropState === ratio.value} >
                    {ratio.key}
                  </OptionText>
                </OptionWrapper>
              ))}
            </ResizeOptionArea>
          )}
         
            {currentTab === View.ratio && (
               <ResizeOptionArea>
                <Select
              value={value}
              autoWidth={true}
              label="Select aspec ratio"
              style={{width: "100%"}}
              variant="outlined"
              onChange={onChangeAspectRatio}
              // input={<Input />}
              MenuProps={MenuProps} >
              {RatioData.map((ratio) => (
                   <React.Fragment>
                     <OptionButton
                  //  selected={cropState === ratio.value}
                  //  aspect_ratio={ratio.value}
                 ></OptionButton>
                 <OptionText selected={cropState === ratio.value} >
                   {ratio.key}
                 </OptionText>
                 </React.Fragment>
            // <MenuItem key={ratio.key} value={ratio.value}>
            //   <OptionButton
            //         // selected={cropState === ratio.value}
            //         // aspect_ratio={ratio.value}
            //       ></OptionButton>
            //   <ListItemText primary={ratio.value} />
            // </MenuItem>

          ))}
        </Select>
               </ResizeOptionArea>
            )}
          
        
          

          {currentTab === View.dimension && (
            <ResizeOptionArea>
              <StyledForm>
                <FieldCover>
                  <Wrapper>
                    <Label>Width(px)</Label>
                    <TextInput
                      name="width"
                      placeholder="Enter preferred width"
                      type="number"
                      onChange={(e) => handleWidthChange(e)}
                      value={width}
                    />
                  </Wrapper>

                  <Wrapper>
                    <Label>Height(px)</Label>

                    <TextInput
                      name="height"
                      placeholder="Enter preferred height"
                      type="number"
                      onChange={(e) => handleHeightChange(e)}
                      value={height}
                    />
                  </Wrapper>
                </FieldCover>

                <ResizeButtonCover>
                  <Button
                    onClick={saveDimensionToRedux}
                    disabled={!width || !height}
                    width="100%"
                    margin="20px 0 0"
                  >
                    Preview
                  </Button>
                </ResizeButtonCover>
              </StyledForm>
            </ResizeOptionArea>
          )}
        </EditArea>
        <PreviewArea>
          {videoUrl && <EditableVideo src={videoUrl} setVideo={setVideoEl} />}
        </PreviewArea>
      </WorkSpace>

      <ScrubArea>
        <VideoControllers video={videoEl!} />
      </ScrubArea>
    </Root>
  );
}

const ResizeTitle = styled.p`
  margin-bottom: 1rem;
`;

const ResizeOptionArea = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const EditAreaTabCover = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.PRIMARY_LIGHT};
  padding: 10px;
`;

const Tab = styled.p<{ active: boolean; disabled?: boolean }>`
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  background: ${({ theme, active, disabled }) =>
    active
      ? theme.colors.PRIMARY_DARK
      : disabled
      ? theme.colors.SECONDARY
      : theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme, active, disabled }) =>
    active
      ? theme.colors.WHITE
      : disabled
      ? theme.colors.WHITE
      : theme.colors.PRIMARY_DARK};
  outline: none;
  box-shadow: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:hover,
  &:focus {
    box-shadow: ${({ theme, disabled }) => !disabled && theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;

const OptionWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.35rem;
  width: fit-content;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.PRIMARY : theme.colors.SECONDARY};
  margin: 0.5rem;
  background-color: ${({ selected }) => (selected ? "#06BFBF1A" : "initial")};
  cursor: pointer;
`;

const OptionButton = styled.button<{ selected?: boolean; aspect_ratio?: string }>`
  margin-right: 0.5rem;
  height: ${({aspect_ratio}) => aspect_ratio === '16:9' ? '9px' :
  aspect_ratio === '1:1' ? '20px' : aspect_ratio === '4:5' ? '10px' : aspect_ratio === '9:16' ? "15px": '15px' };
  width: ${({aspect_ratio}) => aspect_ratio === '16:9' ? '16px' :
  aspect_ratio === '1:1' ? '15px' : aspect_ratio === '4:5' ? '10px' : aspect_ratio === '9:16' ? "15px": '15px' };
  border-radius: 0px;
  outline: none;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? "transparent" : theme.colors.SECONDARY};
  color: transparent;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.PRIMARY : "initial"};
`;


const OptionText = styled.p<{ selected?: boolean }>`
  font-size: 12px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.PRIMARY : theme.colors.PRIMARY_TEXT};
`;

const EditArea = styled.div`
  width: 25%;
  margin-right: 1rem;
  min-width: 370px;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    width: 100%;
    min-width: 300px;
    margin-bottom: 1rem;
  }
`;
const PreviewArea = styled.div`
  width: 75%;
  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    width: 100%;
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
  /* position: absolute; */

  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.shadows.S3};
  height: fit-content;
  width: 100%;
  z-index: 1;
  padding: 1rem;
  box-sizing: border-box;
`;

const StyledForm = styled.div`
  width: 100%;
`;

const FieldCover = styled.div``;

const TextInput = styled.input`
  height: 1.75rem;
  padding: 0.5rem;
  margin: "0 0 15px";
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  outline: none;
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;
const Label = styled.label`
  padding: 0.15rem;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;
const Wrapper = styled.div`
  display: grid;
  row-gap: 0.25rem;
  margin-bottom: 1rem;
`;

const ResizeButtonCover = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const SelectInput = styled.select`
//   border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
//   border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
//   background: ${({ theme }) => theme.colors.WHITE};
//   padding: 0.5rem;
//   outline: none;
//   box-shadow: none;

//   &:hover,
//   &:focus {
//     box-shadow: ${({ theme }) => theme.shadows.S2};
//     border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
//     transition: box-shadow 0.3s linear;
//   }
// `;

// const MakeGifContainer = styled.div`
//   margin-top: 2rem;
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

// const StyledBackdrop = styled(Backdrop)`
//   padding-top: 2rem;
//   position: absolute;
//   border-radius: 20px;
//   width: 100%;
//   z-index: 100 !important;
//   height: 100%;
//   background-color: #fffcff80;
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
