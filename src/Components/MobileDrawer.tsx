import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

interface TNavDrawerProps {
  children: React.ReactNode;
  close: () => void;
  open: () => void;
  isOpen: boolean;
  bgColor: string;
  color: string;
}

const NavDrawer = ({
  open,
  isOpen,
  close,
  children,
  bgColor,
  color,
}: TNavDrawerProps) => {
  return (
    <Drawer>
      <Swipeable
        bgColor={bgColor}
        anchor="left"
        open={isOpen}
        onClose={close}
        onOpen={open}
      >
        <ContentCover>
          <CloseCover>
            <Close size={20} color={color} onClick={close} />
          </CloseCover>
          {children}
        </ContentCover>
      </Swipeable>
    </Drawer>
  );
};

export default NavDrawer;

const Drawer = styled.div``;

const ContentCover = styled.div`
  height: 100%;
`;

const Swipeable = styled(SwipeableDrawer)<{ bgColor: string }>`
  .MuiDrawer-paper {
    width: 70%;
    /* background-color: ${({ theme }) => theme.colors.WHITE}; */
    background-color: ${({ bgColor }) => bgColor};
    padding: 1rem;
  }
`;

const CloseCover = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Close = styled(AiOutlineClose)`
  cursor: pointer;
  font-weight: 700;
`;
