export interface TUserInfo {
  user: {
    name: string;
    email: string;
  };
  subscription: {
    type: string;
    expire_at: string;
    renewal?: string;
  };
}

export interface TTransactionHistory {
  id: number;
  subscription_id: number;
  type: string;
  start_date: string;
  payment_date: string;
  end_date: string;
  order_id: string;
  checkout_id: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  status: string;
  receipt_url: string;
  paddle_subscription_id: number;
  action: string;
}
