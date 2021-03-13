import React from "react";
import styled from "styled-components";
import { TModalController } from "../../Hooks/UseModal";
// @ts-ignore
import Base64Downloader from "react-base64-downloader";

import ModalComponent from "./ModalComponent";
import { Button } from "../../Styles/styles.global";

interface TModalComponentProps {
  controller: TModalController<{ img: any }>;
}

export const ScreenShotModal = React.memo((props: TModalComponentProps) => {
  return (
    <ModalComponent controller={props.controller}>
      <Wrapper>
        <Box>
          <Title>Click on the download button to save this image</Title>
          <Content>
            <Img src={props.controller.modalData?.img} alt="screenshot" />
          </Content>
          <Base64Downloader
            base64={props.controller.modalData?.img}
            downloadName="screenshot"
            style={{background: "#fff", border: "none", padding: "none"}}
          >
            <Button>Click to download</Button>
          </Base64Downloader>{" "}
        </Box>
      </Wrapper>
    </ModalComponent>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
`;

const Img = styled.img`
  width: 500px;
`;

const Box = styled.div`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};

  width: 100%;
  transition: all 0.5s ease-in-out;
  text-align: center;
  opacity: 1;

  @media (max-width: ${({ theme }) => theme.screens.MEDIUM_MOBILE}) {
    height: 250px;
  }
`;

const Title = styled.h1`
  font-size: 21px;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
`;

const Content = styled.div``;
