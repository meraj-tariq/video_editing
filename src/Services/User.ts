import environment from "../Config/Environment";
import api from "./Api";

const { veegixUrl } = environment;

export const getPaymentLinkService: any = async () => {
  const response = await api.Get(`${veegixUrl}/payment/link`);
  return response;
};

export const cancelSubscriptionService: any = async () => {
  const response = await api.Get(`${veegixUrl}/payment/cancel`);
  return response;
};

export const getTransactionHistoryService = async () => {
  const response: any = await api.Get(`${veegixUrl}/payment/history`);
  return response;
};

export const updatePaymentService = async () => {
  const response:any = await api.Get(`${veegixUrl}/payment/update`);
  return response;
};
