import React from "react";
import styled from "styled-components";
import { GoSettings } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { MdSubtitles } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";

const ListItems = React.memo(
  ({
    isDisabled,
    saveProgressModal,
    setIsOpen,
  }: {
    isDisabled: boolean;
    saveProgressModal: any;
    setIsOpen?: (open: boolean) => void;
  }) => {
    const history = useHistory();
    const path = useLocation().pathname;
    const handleRedirect: (pathname: string) => void = (pathname: string) => {
      isDisabled ? saveProgressModal.open() : history.push({ pathname });
    };

    return (
      <Root>
        <List>
          <ListItem
            selected={path === "/edit/resize-video"}
            onClick={() => {
              handleRedirect("/edit/resize-video");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <GoSettings className="icon" size={20} />
            Resize Video
          </ListItem>

          <ListItem
            selected={path === "/edit/trim-video"}
            onClick={() => {
              handleRedirect("/edit/trim-video");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <GoSettings className="icon" size={20} />
            Trim Video
          </ListItem>

          <ListItem
            selected={path === "/edit/video-frame"}
            onClick={() => {
              handleRedirect("/edit/video-frame");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <GoSettings className="icon" size={20} />
            Get Frame
          </ListItem>

          <ListItem
            selected={path === "/edit/make-gif"}
            onClick={() => {
              handleRedirect("/edit/make-gif");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <GoSettings className="icon" size={20} />
            Make Gif
          </ListItem>

          <ListItem
            selected={path === "/edit/subtitles"}
            onClick={() => {
              handleRedirect("/edit/subtitles");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <MdSubtitles className="icon" size={20} />
            Subtitles
          </ListItem>

          <ListItem
            selected={path === "/edit/text"}
            onClick={() => {
              handleRedirect("/edit/text");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <MdSubtitles className="icon" size={20} />
            Set Watermark
          </ListItem>

          <ListItem
            selected={path === "/edit/settings"}
            onClick={() => {
              handleRedirect("/edit/settings");
              setIsOpen?.(false);
            }}
            disabled={isDisabled}
          >
            <FiSettings className="icon" size={20} />
            Settings
          </ListItem>
        </List>
      </Root>
    );
  }
);

export default ListItems;
const Root = styled.div`
  margin-top: 72px;
`;
const List = styled.ul`
  list-style: none;
  padding: 0.5rem;
`;
const ListItem = styled.li<{ selected?: boolean; disabled: boolean }>`
  align-items: center;
  background-color: ${({ theme, selected, disabled }) =>
    selected
      ? theme.colors.WHITE
      : disabled
      ? theme.colors.GREY
      : theme.colors.PRIMARY_DARK};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.PRIMARY_DARK : theme.colors.SECONDARY};
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: normal;
  /* height: 72px; */
  padding: 0.5rem 0;
  justify-content: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  margin: 1rem 0;

  &:hover {
    background-color: ${({ theme, selected, disabled }) =>
      selected
        ? theme.colors.WHITE
        : disabled
        ? theme.colors.GREY
        : theme.colors.PRIMARY_LIGHT};
  }
  .icon {
    margin-bottom: 0.25rem;
  }
`;
