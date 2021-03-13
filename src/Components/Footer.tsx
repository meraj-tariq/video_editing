import React from "react";
import styled from "styled-components";
import { DivContainer } from "../Pages/Homepage/Styles";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Logo></Logo>
        <ListContainer>
          <Title>Links</Title>
          <UL>
            <StyledLink to="/">
              <LI>Home</LI>
            </StyledLink>
            <StyledLink to="/pricing">
              <LI>Pricing</LI>
            </StyledLink>
            <StyledLink to="/register">
              <LI>Sign Up</LI>
            </StyledLink>

            <LI>Privacy</LI>
            <LI>Terms & Conditions</LI>
          </UL>
        </ListContainer>

        <ListContainer>
          <Title>Features</Title>
          <UL>
            <LI>Trim Video</LI>
            <LI>Crop Video</LI>
            <LI>Add Subtitle</LI>
            <LI>Add Text</LI>
          </UL>
        </ListContainer>

        <ListContainer>
          <Title>Social Media</Title>
          <UL>
            <LI>Facebook</LI>
            <LI>Twitter</LI>
            <LI>Instagram</LI>
            <LI>YouTube</LI>
          </UL>
        </ListContainer>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.WHITE};
`;

const Container = styled(DivContainer)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ListContainer = styled.div``;

const Title = styled.h1`
  list-style: none;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.WHITE};
  text-decoration: none;
`;

const UL = styled.ul`
  list-style: none;
  padding: 0;
  min-width: 100px;
`;

const LI = styled.li`
  cursor: pointer;
  margin-bottom: 10px;
`;

const Logo = styled.div`
  min-width: 100px;
  width: 200px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;
