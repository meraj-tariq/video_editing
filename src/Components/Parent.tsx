import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Button } from "../Styles";
import { GrUndo, GrRedo } from "react-icons/gr";

import { colors } from "../Theme";

import { BiChevronLeft } from "react-icons/bi";
import ListItems from "./ListItems";
import NavIcon from "./NavIcon";
import useService from "../Hooks/UseService";
import { saveProgressService } from "../Services/Video";
import UseJobId from "../Hooks/UseJobId";
import { useDispatch } from "react-redux";
import Notify from "../Store/Actions/NotifyAction";
import { ProgressContext, TEditInfo } from "./ProgressContext";
import SaveEditProgressModal from "../Pages/SaveEditProgressModal";
import useModal from "../Hooks/UseModal";
import UseSavedProgress from "../Hooks/UseProgressSaved";
import { videoDimensions } from "../Store/Actions/VideoAction";
import useWindowSize from "../Hooks/UseWindowSize";
import { AiOutlineMenu } from "react-icons/ai";
import MobileDrawer from "./MobileDrawer";

const AppBarHeight = 72;

export default function Parent({ children }: any) {
  const history = useHistory();
  const slug = localStorage.getItem("slug");
  const progressModal = useModal<{ data: TEditInfo }>(false);
  const dispatch = useDispatch();
  const [isProgressSaved, setProgressSaved] = useState(false);
  const [isProgressDisabled, setProgressDisabled] = useState(false);
  const { existingJobId } = UseJobId();

  const [isOpen, setIsOpen] = useState(false);
  const [width] = useWindowSize();

  const maxMobileScreenWidth = 767;
  const isMobile = width < maxMobileScreenWidth;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const [editInfo, setEditInfo] = useState<TEditInfo>({
    original: "",
    id: "",
    clip: false,
    resize: false,
    ratio: null,
    dimensions: null,
    start_time: "",
    end_time: "",
  });

  const { progressData, index, setIndex, length } = UseSavedProgress();

  const isRedoActive = index < length - 1 && length > 1;
  const isUndoActive = index > 0 && length > 1;

  const redo = () => {
    if (index < length - 1 && length > 1) {
      setIndex(index + 1);
      dispatch(
        videoDimensions({
          width: progressData.width,
          height: progressData.height,
          defaultHeight: progressData.height,
          defaultWidth: progressData.width,
        })
      );
    }
  };

  const undo = () => {
    if (index > 0 && length > 1) {
      setIndex(index - 1);
      dispatch(
        videoDimensions({
          width: progressData.width,
          height: progressData.height,
          defaultHeight: progressData.height,
          defaultWidth: progressData.width,
        })
      );
    }
  };

  const saveEditProgress = useService(saveProgressService);

  const saveProgress = () => {
    saveEditProgress
      .call(slug!, existingJobId!)
      .onSuccess(() => {
        dispatch(Notify.success("Progress Saved"));
      })
      .onError(() => {});
  };

  return (
    <ProgressContext.Provider
      value={{
        isSaved: isProgressSaved,
        setSaved: setProgressSaved,
        disableProgress: isProgressDisabled,
        setProgressDisabled: setProgressDisabled,
        editInfo,
        setEditInfo,
        progressData,
      }}
    >
      <Root>
        {/* <StyledBackdrop open={editProgressLoading}>
          {editProgressLoading && (
            <LoaderCover>
              <CircularLoader size={55} />{" "}
              <LoaderText>Saving Progress...</LoaderText>
            </LoaderCover>
          )}
        </StyledBackdrop> */}

        <AppBar>
          <AppBarItemWrapper>
            <BackButton onClick={() => history.push('/videos')}>
              <NavIcon icon={<BiChevronLeft color={colors.WHITE} />} />
              Go Back
            </BackButton>
            {/* <ProjectName>Project Name</ProjectName> */}
            <ActionWrapper>
              {!isMobile && (
                <IconGroup>
                  <IconButton
                    onClick={() => {
                      isUndoActive && undo();
                    }}
                  >
                    <GrUndo
                      size={isMobile ? 20 : 25}
                      color={isUndoActive ? colors.GREY : colors.SECONDARY}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      isRedoActive && redo();
                    }}
                  >
                    <GrRedo
                      size={isMobile ? 20 : 25}
                      color={isRedoActive ? colors.GREY : colors.SECONDARY}
                    />
                  </IconButton>
                </IconGroup>
              )}
              <Button onClick={saveProgress}>
                {saveEditProgress.isLoading ? (
                  <ButtonLoader size={15} />
                ) : (
                  "  Save Progress"
                )}
              </Button>

              <Button>Download</Button>
            </ActionWrapper>
          </AppBarItemWrapper>
        </AppBar>

        {!isMobile && (
          <Drawer>
            <ListItems
              saveProgressModal={progressModal}
              isDisabled={isProgressDisabled}
            />
          </Drawer>
        )}
        <Content>
          {isMobile && (
            <MenuIconCover>
              <Menu onClick={handleClick}>
                <AiOutlineMenu size={20} color={colors.PRIMARY} /> <p>Menu</p>
              </Menu>
              <IconGroup>
                <IconButton
                  onClick={() => {
                    isUndoActive && undo();
                  }}
                >
                  <GrUndo
                    size={isMobile ? 20 : 25}
                    color={isUndoActive ? colors.GREY : colors.SECONDARY}
                  />
                </IconButton>
                <IconButton
                  onClick={() => {
                    isRedoActive && redo();
                  }}
                >
                  <GrRedo
                    size={isMobile ? 20 : 25}
                    color={isRedoActive ? colors.GREY : colors.SECONDARY}
                  />
                </IconButton>
              </IconGroup>
            </MenuIconCover>
          )}
          <Container>{children}</Container>
        </Content>
        <SaveEditProgressModal controller={progressModal} />

        <MobileDrawer
          close={() => setIsOpen(false)}
          open={() => setIsOpen(true)}
          isOpen={isOpen}
          bgColor={colors.PRIMARY_DARK}
          color={colors.WHITE}
        >
          <Drawer>
            <ListItems
              saveProgressModal={progressModal}
              isDisabled={isProgressDisabled}
              setIsOpen={setIsOpen}
            />
          </Drawer>
        </MobileDrawer>
      </Root>
    </ProgressContext.Provider>
  );
}
const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const AppBar = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: ${({ theme }) => theme.shadows.S1};
  display: flex;
  height: ${AppBarHeight}px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.DRAWER} + 1;
`;

const AppBarItemWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: space-between;
  /* padding: 0 26px; */
  padding-left: 26px;
  padding-right: 16px;
  width: inherit;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    padding: 0;
    flex-wrap: unset;
  }
`;

const Container = styled.div`
  height: inherit;
  overflow: auto;

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
`;

const Content = styled.main`
  flex-grow: 1;
  padding-top: calc(${AppBarHeight}px + 16px);
  height: calc(100vh - ${AppBarHeight}px - 16px);

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    width: 100%;
  }
`;

const Drawer = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.S1};
  background-color: ${({ theme }) => theme.colors.PRIMARY_DARK};
  height: 100vh;
  /* padding-top: calc(${AppBarHeight}px - 14px); */
  min-width: calc(${AppBarHeight}px + 38px);

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    height: fit-content;
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 2.5px;
  outline: none;
`;

const BackButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
  align-items: center;
  display: flex;
  font-size: 14px;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    min-width: 100px;
  }
`;

const IconGroup = styled.div`
  margin-right: 2rem;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    display: flex;
    margin-right: 0;
  }
`;

// const ProjectName = styled.h1`
//   color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
//   font-size: 16px;
//   font-weight: normal;
// `;

const Root = styled.div`
  display: flex;
  /* @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    flex-direction: column;
  } */
`;

const ButtonLoader = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    .MuiCircularProgress-svg {
      color: ${({ theme }) => theme.colors.WHITE};
    }
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

// const CircularLoader = styled(CircularProgress)`
//   &.MuiCircularProgress-root {
//     .MuiCircularProgress-svg {
//       color: ${({ theme }) => theme.colors.WHITE};
//     }
//   }
//   margin-bottom: 1rem;
// `;

// export const LoaderCover = styled.div`
//   text-align: center;
// `;

// export const LoaderText = styled.p`
//   font-size: 40px;
//   color: ${({ theme }) => theme.colors.WHITE};
// `;

const MenuIconCover = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};

  p {
    color: ${({ theme }) => theme.colors.PRIMARY};
    margin: 0 5px;
  }
`;
