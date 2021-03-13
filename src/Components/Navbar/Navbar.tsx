import React, { useState } from "react";
import styled from "styled-components";
import { DivContainer } from "../../Pages/Homepage/Styles";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import useWindowSize from "../../Hooks/UseWindowSize";

import NavbarDrawer from "../MobileDrawer";
import { colors } from "../../Theme";
import { useSelector } from "react-redux";

const NavList: React.FC<{
  show: boolean;
  setShow: (show: boolean) => void;
}> = ({ show, setShow }) => (
  <UL>
    <StyledLink to="/">
      <LI>Home</LI>
    </StyledLink>
    <LI onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      Features{" "}
      {show ? (
        <Span>
          <Up />
        </Span>
      ) : (
        <Span>
          <Down />
        </Span>
      )}
      {show && (
        <Popper>
          <SubUL>
            <SubLI>Trim Video</SubLI>
            <SubLI>Crop Video</SubLI>
            <SubLI>Add Subtitle</SubLI>
          </SubUL>
        </Popper>
      )}
    </LI>
    <StyledLink to="/pricing">
      <LI>Pricing</LI>
    </StyledLink>
  </UL>
);

const Navbar = () => {
  const [show, setShow] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [width] = useWindowSize();

  const maxMobileScreenWidth = 767;
  const isMobile = width < maxMobileScreenWidth;

  const token = useSelector((state) => state.Auth.access_token);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Container>
        {isMobile && (
          <div className="menu-icon" onClick={handleClick}>
            <AiOutlineMenu size={20} color={colors.WHITE} />
          </div>
        )}
        <Logo></Logo>
        <ListContainer>
          {!isMobile && <NavList show={show} setShow={setShow} />}
          <UL>
            {!isMobile && (
              <StyledLink to={token ? "/create-project" : "/login"}>
                <LI normal>Sign In</LI>
              </StyledLink>
            )}

            <Link to="/register">
              <SIGNUP>Sign Up</SIGNUP>
            </Link>
          </UL>
        </ListContainer>
      </Container>

      <NavbarDrawer
        close={() => setIsOpen(false)}
        open={() => setIsOpen(true)}
        isOpen={isOpen}
        bgColor={colors.WHITE}
        color={colors.PRIMARY_DARK}
      >
        <div>
          <ListContainer mobile={isMobile}>
            <DrawUL>
              <StyledLink to="/">
                <DrawLI>Home</DrawLI>
              </StyledLink>
              <DrawLI onClick={() => setShow(!show)}>
                Features{" "}
                {show ? (
                  <Span>
                    <Down mobile={isMobile} />
                  </Span>
                ) : (
                  <Span>
                    <Right />
                  </Span>
                )}
                {show && (
                  <SubUL mobile={isMobile}>
                    <DrawSubLI>Trim Video</DrawSubLI>
                    <DrawSubLI>Crop Video</DrawSubLI>
                    <DrawSubLI>Add Subtitle</DrawSubLI>
                  </SubUL>
                )}
              </DrawLI>
              <StyledLink to="/pricing">
                <DrawLI>Pricing</DrawLI>
              </StyledLink>
            </DrawUL>{" "}
            <DrawUL>
              <StyledLink to={token ? "/create-project" : "/login"}>
                <SIGNUP>Sign In</SIGNUP>
              </StyledLink>
            </DrawUL>
          </ListContainer>
        </div>
      </NavbarDrawer>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  padding: 0 1rem;
  background-color: rgba(3, 94, 115, 0.4);
  /* background-color: rgba($color: rgb(3, 94, 115), $alpha: 0.4); */
`;

const Container = styled(DivContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Popper = styled.div`
  background-color: ${({ theme }) => theme.colors.WHITE};
  /* margin-bottom: 1rem; */
  /* margin-top: 10px; */
`;

const ListContainer = styled.div<{ mobile?: boolean }>`
  display: flex;
  flex-direction: ${({ mobile }) => mobile && "column"};
  justify-content: space-between;
  color: ${({ theme, mobile }) =>
    mobile ? "rgba(3, 94, 115, 0.4)" : theme.colors.WHITE};
  align-items: ${({ mobile }) => !mobile && "center"};
`;

const DrawUL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DrawLI = styled.li<{ normal?: boolean }>`
  cursor: pointer;
  font-size: 23px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.PRIMARY_DARK};
`;

const DrawSubLI = styled.li`
  margin-bottom: 10px;
  font-size: 15px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
`;

const UL = styled.ul<{ mobile?: boolean }>`
  display: flex;
  flex-direction: ${({ mobile }) => mobile && "column"};
  list-style: none;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.WHITE};
  text-decoration: none;
`;

const LI = styled.li<{ normal?: boolean }>`
  margin-right: ${({ normal }) => (normal ? "10px" : "2rem")};
  cursor: pointer;
  position: relative;
  height: 100%;
`;

const SubUL = styled.ul<{ mobile?: boolean }>`
  list-style: none;
  align-items: center;
  position: ${({ mobile }) => !mobile && "absolute"};
  padding: 0;
  min-width: 120px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.BG_PRIMARY};
  padding: 10px;
`;

const SubLI = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
`;

const Span = styled.span``;

const Down = styled(FiChevronDown)<{ mobile?: boolean }>`
  margin-bottom: ${({ mobile }) => (mobile ? "-4px" : "-2px")};
`;

const Up = styled(FiChevronUp)`
  margin-bottom: -2px;
`;

const Right = styled(FiChevronRight)`
  margin-bottom: -4px;
`;

const SIGNUP = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.WHITE};
  width: 100px;
  height: 35px;
  background: #1ebfbf 0% 0% no-repeat padding-box;
  border-radius: 5px;
  border: none;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
`;

const Logo = styled.div`
  width: 100px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;
