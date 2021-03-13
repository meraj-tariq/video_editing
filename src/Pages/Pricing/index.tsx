import React from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "./Banner";
import PricingSection from "./PricingSection";

const Home = () => {
  return (
    <HomeContainer>
      <StickyTop>
        <Navbar />
      </StickyTop>
      <Banner />
      <PricingSection />
      <Footer />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.BG_PRIMARY};
  height: 100%;
  position: relative;
`;

const StickyTop = styled.div`
  position: sticky;
  top: 0;
  transition: all 0.3s ease;
  z-index: 1000;
`;
