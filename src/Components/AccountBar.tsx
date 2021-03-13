import React from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

import AppBarContainer from "./AppBarContainer";
import NavIcon from "./NavIcon";
import { colors } from "../Theme";
import AppMenu from "./AppMenu";
import { useHistory, useLocation } from "react-router-dom";
import Auth from "../Services/AuthService";
import { BiChevronLeft } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";

const logOut = Auth.logOut;

const path = ["/videos", "/profile"];

const AccountBar: React.FC<{
  children: React.ReactNode;
  videos?: boolean;
  upload?: boolean;
}> = ({ children, videos, upload }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <AppBarContainer upload={upload}>
        {path.includes(location.pathname) && (
          <BackButton onClick={() => history.push("/")}>
            <NavIcon icon={<BiChevronLeft color={colors.WHITE} />} />
            Go Back
          </BackButton>
        )}

        {location.pathname === "/create-project" && (
          <BackButton onClick={() => history.push("/")}>
            <NavIcon icon={<AiOutlineHome color={colors.WHITE} />} />
            Home
          </BackButton>
        )}
        <Wrapper>
          <Avatar>
            <Initials>AD</Initials>
          </Avatar>
          <Profile>
            <Name>Adekunle</Name>
            <Plan>Free Plan</Plan>
          </Profile>

          <AppMenu
            icon={<NavIcon icon={<IoMdArrowDropdown color={colors.WHITE} />} />}
            listItem={[
              { Profile: () => history.push("/profile") },
              {
                "Log Out": () => logOut(history),
              },
            ]}
          />
        </Wrapper>
      </AppBarContainer>
      <Root videos={videos} upload={upload}>
        {children}
      </Root>
    </>
  );
};

export default AccountBar;
const Root = styled.div<{ videos?: boolean; upload?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ videos }) => (videos ? "row" : "column")};
  justify-content: center;
  align-items: ${({ upload }) => upload && "center"};
  min-height: ${({ upload }) => upload && `calc(100vh - 72px - 16px)`};
  padding-top: ${({ videos }) =>
    videos ? "calc(0px + 16px)" : "calc(72px + 16px)"};
  overflow: hidden;
  padding-bottom: 1rem;
`;
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: 38px;
  width: 100%;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    padding-right: 0;
  }
`;
const Avatar = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.DANGER};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.WHITE};
  display: flex;
  height: 42px;
  justify-content: center;
  width: 42px;
`;

const Profile = styled.div`
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const Name = styled.p`
  font-size: 16.5px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
`;

const Plan = styled.p`
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const Initials = styled.p`
  font-weight: 500;
  font-size: 16.7px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 2.5px;
  outline: none;
`;
const BackButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
  align-items: center;
  display: flex;
  font-size: 14px;
  width: 7.5rem;
  margin-left: 0.75rem;
  min-width: 95px;
`;
