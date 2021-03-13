import React from "react";
import styled from "styled-components";
import { ReactComponent as UploadImg } from "../../Assets/Images/upload.svg";
import { ReactComponent as EditImg } from "../../Assets/Images/Edit.svg";
import { ReactComponent as DownloadImg } from "../../Assets/Images/Download.svg";
import Triangle from "../../Assets/Images/shot.png";
import Grid from "../../Assets/Images/gridDark.svg";
import RotateGrid from "../../Assets/Images/rotateGrid.svg";
import { Link } from "react-router-dom";

import { DivContainer } from "./Styles";
import { Button } from "../../Styles/styles.global";
import { useSelector } from "react-redux";

const GetStarted = () => {
  const token = useSelector((state) => state.Auth.access_token);
  const Contents: { img: React.ReactNode; title: string; text: string }[] = [
    {
      img: <UploadImage />,
      title: "Upload Video",
      text:
        "Upload your video easily to our platform. We subtitle mp4, mov, wmv and avi files.",
    },
    {
      img: <EditImage />,
      title: "Edit Video",
      text:
        "Use the online subtitle editor to easily adjust the automatic generated subtitles.",
    },
    {
      img: <DownloadImage />,
      title: "Download Video",
      text:
        "Download your finalized SRT file or download a video with burned subtitles directly.",
    },
  ];
  return (
    <GetStartedContainer>
      <Container>
        <Header>
          <HeaderTitle>Easy to work with</HeaderTitle>
          <HeaderText>
            No prior knowledge or training needed to get started
          </HeaderText>
        </Header>
        <CardContainer>
          {Contents.map((content, i) => (
            <Card key={content.title}>
              <Cover showSh={i === 0}>
                {content.img}
                <H1>{content.title}</H1>
                <Text>{content.text}</Text>
              </Cover>
              {content.title !== "Download Video" && (
                <IconContainer>
                  <Img src={Triangle} alt="triangle" />
                </IconContainer>
              )}
            </Card>
          ))}
        </CardContainer>
        <EditContainer>
          <EditYourVid>
            <HeaderTitle>Edit your videos easily</HeaderTitle>
            <Link to={token ? "/create-project" : "/login"}>
              <Button>Get Started</Button>
            </Link>
          </EditYourVid>
        </EditContainer>
      </Container>
    </GetStartedContainer>
  );
};

export default GetStarted;

const GetStartedContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 3rem 0 1rem;
`;

const Container = styled(DivContainer)`
  text-align: center;
  padding: 1rem;
`;

const UploadImage = styled(UploadImg)`
  width: 80px;
`;

const EditImage = styled(EditImg)`
  width: 80px;
`;
const DownloadImage = styled(DownloadImg)`
  width: 80px;
`;

const Header = styled.div`
  margin-bottom: 4rem;
`;

const HeaderTitle = styled.h1`
  font-size: 35px;
  margin-bottom: 1rem;
`;

const HeaderText = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
`;

const H1 = styled.h1`
  font-size: 25px;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 13px;
  margin-bottom: 1rem;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 7rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  flex: 0 1 33%;
  min-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 250px;
  flex-grow: 0.5;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    flex: 0 1 100%;
  }
`;

const Cover = styled.div<{ showSh?: boolean }>`
  /* box-shadow: 4px 3px 10px #00000029; */
  box-shadow: ${({ showSh }) =>
    showSh ? "0px 3px 10px #00000029" : "4px 3px 10px #00000029"};
  opacity: 1;
  height: 350px;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    box-shadow: 0px 3px 10px #00000029;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 45%;
  right: -25px;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    right: 40%;
    top: unset;
    bottom: -35px;
    transform: rotate(90deg);
  }
`;

const Img = styled.img``;

const EditContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 100;

  &::before {
    content: url(${RotateGrid});
    position: absolute;
    top: -60px;
    left: -130px;
    z-index: -1;
  }

  &::after {
    content: url(${Grid});
    position: absolute;
    bottom: -60px;
    right: -110px;
    z-index: -1;
  }
`;

const EditYourVid = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 5rem;
  background: transparent linear-gradient(336deg, #f1f1f1 0%, #ffffff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 3px 20px #00000029;
  border-radius: 10px;
  opacity: 1;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
