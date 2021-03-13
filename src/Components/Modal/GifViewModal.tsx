import React from "react";
import styled from "styled-components";
import { TModalController } from "../../Hooks/UseModal";

import ModalComponent from "./ModalComponent";
import { Button } from "../../Styles/styles.global";

interface TModalComponentProps {
  controller: TModalController<{ url: any }>;
}

export const GifViewModal = React.memo((props: TModalComponentProps) => {
  return (
    <ModalComponent controller={props.controller}>
      <Wrapper>
        <Box>
          <Title>Click on the button to download GIF </Title>
          <Content>
            <Img src={props.controller.modalData?.url} alt="veegic.gif" />
          </Content>

          <a href={props.controller.modalData?.url} download="veegic.gif">
            <Button>Download</Button>
          </a>
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
  font-size: 28px;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
`;

const Content = styled.div``;
