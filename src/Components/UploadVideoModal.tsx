import React from "react";
import styled from "styled-components";

import ModalComponent from "../Components/Modal/ModalComponent";
import { TModalController } from "../Hooks/UseModal";

interface TModalComponentProps {
  title?: string;
  children: React.ReactElement | React.ReactElement[];
  controller: TModalController | TModalController<any>;
  width?: string;
  height?: string;
  padding?: string;
}

export const UploadVideoModal = (props: TModalComponentProps) => {
  return (
    <ModalComponent controller={props.controller}>
      <Wrapper>
        <Box
          width={props.width!}
          height={props.height!}
          padding={props.padding!}
        >
          <Title>{props.title}</Title>
          {props.children}
        </Box>
      </Wrapper>
    </ModalComponent>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Box = styled.div<{ width: string; height: string; padding: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  max-width: ${({ width }) => (width ? width : "696px")};
  row-gap: 1rem;
  height: ${({ height }) => (height ? height : "360px")};
  width: 100%;
  padding: ${({ padding }) => (padding ? padding : "0.5rem")};
  transition: all 0.5s ease-in-out;
  text-align: center;
  opacity: 1;

  @media (max-width: ${({ theme }) => theme.screens.MEDIUM_MOBILE}) {
    height: 250px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
`;
