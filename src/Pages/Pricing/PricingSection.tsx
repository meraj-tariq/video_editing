/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { DivContainer } from "../Homepage/Styles";
import { ReactComponent as LeftDiamond } from "../../Assets/Images/left-diamond.svg";
import { ReactComponent as RightDiamond } from "../../Assets/Images/right-diamond.svg";
import { useSelector } from "react-redux";
import Cookie from "../../Services/Cookie";
import { useHistory } from "react-router-dom";
import { Paddle } from "../../Config/constant";

const Section = () => {
  const email = Cookie.get("veegic-mail");
  const token = useSelector((state) => state.Auth.access_token);
  const history = useHistory();

  const openCheckout = () => {
    Paddle.Checkout.open({
      product: 8103,
      email: email,
    });
  };

  return (
    <SectionContainer>
      <Container>
        <ButtonIllustrator>
          <ButtonText active>Monthly</ButtonText>
          <ButtonText>Annually</ButtonText>
        </ButtonIllustrator>{" "}
        <CardContainer>
          <Card>
            <LeftLogo />
            <Title>Free</Title>
            <Price>
              <Sup>₦</Sup>0<Span>/Month</Span>
            </Price>
            <UL>
              <LI>Automatic video captions</LI>
              <LI>Progress bar animations</LI>
              <LI>Logo upload</LI>
              <LI>Video resizing</LI>
              <LI>Custom headlines</LI>
              <LI>Caption styling & positioning</LI>
            </UL>
            <Button
              onClick={() => {
                token
                  ? history.push("/create-project")
                  : history.push("/login");
              }}
            >
              Choose Plan
            </Button>
          </Card>

          <Card>
            <RightLogo />
            <Title>Premium</Title>
            <Price>
              <Sup>₦</Sup>5<Span>/Month</Span>
            </Price>
            <UL>
              <LI>Automatic video captions</LI>
              <LI>Progress bar animations</LI>
              <LI>Logo upload</LI>
              <LI>Video resizing</LI>
              <LI>Custom headlines</LI>
              <LI>Caption styling & positioning</LI>
            </UL>
            <Button
              onClick={() => {
                token ? openCheckout() : history.push("/login");
              }}
            >
              Choose Plan
            </Button>
          </Card>
        </CardContainer>
      </Container>
    </SectionContainer>
  );
};

export default Section;

const SectionContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  display: flex;
  justify-content: center;
`;

const Container = styled(DivContainer)`
  padding: 3rem 1rem 1rem;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 7rem;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    flex-wrap: wrap;
  }
`;

const Card = styled.div`
  flex: 0 1 45%;
  min-width: 250px;
  text-align: center;
  flex-grow: 0.5;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #035e73;
  border-radius: 10px;
  opacity: 1;
  padding: 2rem 3rem;
  margin: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  font-size: 25px;
  letter-spacing: 0px;
  color: #02303b;
  opacity: 1;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const Price = styled.p`
  font-size: 50px;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
`;

const LeftLogo = styled(LeftDiamond)`
  width: 100px;
  height: auto;
`;

const RightLogo = styled(RightDiamond)`
  width: 100px;
  height: auto;
`;

const Span = styled.span`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOOK};
`;

const Sup = styled.sup`
  font-size: 20px;
  font-weight: 700;
`;

const UL = styled.ul`
  list-style: none;
  align-items: center;
  padding: 0;
  margin-bottom: 2rem;
`;

const LI = styled.li<{ normal?: boolean }>`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_MEDIUM};
  font-size: 17px;
  letter-spacing: 0px;
  color: #02303b;
  opacity: 1;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background: #1ebfbf 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  width: 200px;
  height: 50px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_MEDIUM};
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  cursor: pointer;
  border: none;
`;

const ButtonIllustrator = styled.div`
  background: #035e731a 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: fit-content;
  height: 50px;
  align-items: center;
  padding: 0 5px;
  margin: 0 auto;

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    width: 55%;
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
  padding: 0px 25px;
  border-radius: 10px;
  cursor: pointer;
`;
