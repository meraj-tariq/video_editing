import React from "react";
import styled from "styled-components";
import Picture from "../../Assets/Images/Workspace@2x.png";
import Grid from "../../Assets/Images/grid.svg";
import RotateGrid from "../../Assets/Images/rotateLight.svg";
import { DivContainer } from "./Styles";

const ImageOverview = () => {
  return (
    <ImageOverviewContainer>
      <Content>
        <ImageContainer>
          <ButtonIllustrator>
            <ButtonText active>Trimming Video</ButtonText>
            <ButtonText>Cropping Video</ButtonText>
            <ButtonText>Subtitling</ButtonText>
          </ButtonIllustrator>
          <Img src={Picture} alt="" />
        </ImageContainer>
      </Content>
    </ImageOverviewContainer>
  );
};

export default ImageOverview;

const ImageOverviewContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  /* height: 100vh; */
  padding: 5rem 0rem 1rem;
  /* max-height: 100vh; */
`;

const Content = styled(DivContainer)`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;

  position: relative;

  &::before {
    content: url(${Grid});
    position: absolute;
    top: -30px;
    left: -80px;

    @media ${({ theme }) => theme.screens.SMALL_TABLET} {
      width: 100px;
    }
  }

  &::after {
    content: url(${RotateGrid});
    position: absolute;
    bottom: 0px;
    right: -80px;
    /* z-index: 1; */

    @media ${({ theme }) => theme.screens.SMALL_TABLET} {
      width: 100px;
    }
  }
`;

const ImageContainer = styled.div`
  width: fit-content;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 2px solid #035e73;
  border-radius: 10px;
  opacity: 1;
  padding: 1rem 4rem;

  z-index: 100;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    padding: 1rem 2rem;
    width: 90%;
  }
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: 85%;
`;

const ButtonIllustrator = styled.div`
  background: #035e731a 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 400px;
  height: 50px;
  align-items: center;
  padding: 0 5px;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    width: 100%;
    height: 38px;
  }
`;
const ButtonText = styled.p<{ active?: boolean }>`
  font-size: 11px;
  color: ${({ theme, active }) =>
    active ? theme.colors.WHITE : theme.colors.PRIMARY_TEXT};
  background-color: ${({ theme, active }) => active && theme.colors.BG_PRIMARY};
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 10px;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    font-size: 9px;
    padding: 0 5px;
  }
`;
