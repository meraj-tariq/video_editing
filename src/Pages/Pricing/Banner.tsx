import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerContainer>
      <H1>Pricing</H1>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.WHITE};
  height: 60vh;
  padding: 0 1rem;
  margin-top: -3.8rem;
  background: transparent linear-gradient(167deg, #035e73 0%, #022f3a 100%) 0%
    0% no-repeat padding-box;
  opacity: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    padding: 0;
    height: 40vh;
  }
`;

const H1 = styled.h1`
  font-size: 80px;
  margin-bottom: 1rem;
  text-align: center;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    font-size: 40px;
  }
`;
