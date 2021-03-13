import React from "react";
import styled from "styled-components";
import { DivContainer } from "./Styles";
import BgImage from "../../Assets/Images/bgImg.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <BannerContainer>
      <Container>
        <H1>
          Make easy and quick <br /> edits to your videos
        </H1>
        <Text>Add subtitles, texts, crop and trim your videos</Text>
        <Link to="/register">
          <Button>Sign Up</Button>
        </Link>
      </Container>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.WHITE};
  height: 100vh;
  padding: 0 1rem;
  max-height: 100vh;
  background-image: url(${BgImage});
  background-position: center;
  background-size: cover;

  background-repeat: no-repeat;
  margin-top: -3.8rem;

  @media ${({ theme }) => theme.screens.MEDIUM_TABLET} {
    padding: 0;
    height: 60vh;
  }

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    padding: 0;
    height: 70vh;
  }
`;

const Container = styled(DivContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const H1 = styled.h1`
  font-size: 80px;
  margin-bottom: 1rem;
  text-align: center;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    font-size: 41px;
    margin-bottom: 2rem;
  }
`;

const Text = styled.p`
  font-size: 24px;
  margin-bottom: 1rem;
  text-align: center;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    margin-bottom: 2rem;
  }
`;

const Button = styled.button`
  background: #06bfbf 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.WHITE};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  width: 288px;
  height: 64px;
  font-size: 16px;
`;
