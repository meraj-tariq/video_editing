/* eslint-disable react-hooks/exhaustive-deps */
import { capitalize, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AccountBar from "../../Components/AccountBar";
import format from "date-fns/format";
import { fetchAllVideos } from "../../Store/Actions/VideoAction";
import { fetchUserDetails } from "../../Store/Actions/Auth";
import {
  cancelSubscriptionService,
  updatePaymentService,
} from "../../Services/User";
import useService from "../../Hooks/UseService";
import Notify from "../../Store/Actions/NotifyAction";
import TransactionHistory from "./TransactionHistory";
import { Paddle } from "../../Config/constant";

export default function Settings() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.Auth.user_info!);
  const cancelSubscription = useService(cancelSubscriptionService);
  const updatePayment = useService(updatePaymentService);

  const update = () => {
    updatePayment.call().onSuccess((data) => {
      Paddle.Checkout.open({
        override: data?.url,
      });
    });
  };

  const { user, subscription } = userInfo;

  const cancel = () => {
    cancelSubscription
      .call()
      .onSuccess(() => {
        dispatch(fetchUserDetails());
      })
      .onError((err) => dispatch(Notify.error(err?.message)));
  };

  useEffect(() => {
    dispatch(fetchAllVideos());
    dispatch(fetchUserDetails());
  }, []);

  return (
    <AccountBar videos>
      <WorkSpace>
        <TopView>
          <Container>
            <Title>Personal Information</Title>
            <InfoCover>
              <Info>
                <Key>Name:</Key>
                <Value>{capitalize(user?.name ?? "")}</Value>
              </Info>
              <Info>
                <Key>Email:</Key>
                <Value>{user?.email}</Value>
              </Info>
            </InfoCover>
          </Container>
          <Container>
            <Title>Subscription</Title>
            <InfoCover>
              <Info>
                <Key>Type:</Key>
                <Value>{capitalize(subscription?.type ?? "")}</Value>
              </Info>
              <Info>
                <Key>Expiration Date:</Key>
                <Value>
                  {subscription?.expire_at
                    ? format(
                        new Date(subscription?.expire_at),
                        "EEEE, LLL d, yyyy"
                      )
                    : "---"}
                </Value>
              </Info>
              <Info>
                <Key>Renewal Status:</Key>
                <Value>{subscription?.renewal ? "Active" : "Not Active"}</Value>
              </Info>
            </InfoCover>

            {subscription?.renewal && (
              <>
                <Button onClick={cancel}>
                  {cancelSubscription.isLoading ? (
                    <CircularLoader size={15} />
                  ) : (
                    " Cancel Subscription"
                  )}
                </Button>
                <Button onClick={update} update>
                  {updatePayment.isLoading ? (
                    <CircularLoader size={15} />
                  ) : (
                    " Update Payment"
                  )}
                </Button>
              </>
            )}
          </Container>
        </TopView>
        <TransactionHistory />
      </WorkSpace>
    </AccountBar>
  );
}
const Container = styled.div`
  width: 30%;
  min-width: 300px;
  padding: 2rem 0;

  @media ${({ theme }) => theme.screens.MEDIUM_MOBILE} {
    min-width: 100%;
  }
`;

const TopView = styled.div`
  background-color: ${({ theme }) => theme.colors.BG_PRIMARY};
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 1rem 3rem;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  flex-wrap: wrap;

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    padding: 15px 10px;
  }
`;

const InfoCover = styled.div``;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Key = styled.p``;

const Value = styled.p`
  text-align: start;
`;

const Button = styled.button<{ update?: boolean }>`
  background-color: ${({ theme, update }) =>
    update ? theme.colors.PRIMARY : theme.colors.DANGER};
  color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: none;
  outline: none;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  width: 140px;
  height: 20px;
  margin-right: 10px;
`;

const WorkSpace = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.GREY};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  padding: 1rem;

  @media ${({ theme }) => theme.screens.MEDIUM_MOBILE} {
    width: 90%;
    height: auto;
    border: none;
  }
`;

const CircularLoader = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    .MuiCircularProgress-svg {
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
  margin-bottom: 1rem;
`;
