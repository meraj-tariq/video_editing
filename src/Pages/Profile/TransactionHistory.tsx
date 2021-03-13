/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import React, { useEffect } from "react";
import Table from "../../Components/Table";
import useService from "../../Hooks/UseService";
import { getTransactionHistoryService } from "../../Services/User";
import { TTransactionHistory } from "../../Types/User";

const tableHead: { name: keyof TableData; displayName: string }[] = [
  { name: "id", displayName: "ID" },
  { name: "subscription_id", displayName: "Subscription ID" },
  { name: "type", displayName: "Type" },
  { name: "start_date", displayName: "Start Date" },
  { name: "payment_date", displayName: "Payment Date" },
  { name: "end_date", displayName: "End Date" },
  { name: "order_id", displayName: "Order ID" },
  { name: "checkout_id", displayName: "Checkout ID" },
  { name: "payment_method", displayName: "Payment Method" },
  { name: "created_at", displayName: "Created At" },
  { name: "updated_at", displayName: "Updated At" },
  { name: "status", displayName: "Status" },
  { name: "receipt_url", displayName: "Receipt Url" },
  { name: "paddle_subscription_id", displayName: "Paddle Subscription ID" },
  { name: "action", displayName: "Action" },
];

type TableData = TTransactionHistory;

const TransactionHistory = () => {
  const getTransactionHistory = useService(getTransactionHistoryService);

  useEffect(() => {
    getTransactionHistory.call();
  }, []);

  return (
    <Table<TableData, TTransactionHistory>
      isLoading={getTransactionHistory.isLoading}
      title="Transaction History"
      fields={tableHead}
      tableData={getTransactionHistory.data?.transactions ?? []}
      builder={(field, data) => {
        switch (field.name) {
          case "start_date":
            return format(new Date(data.start_date), "LLL d, yyyy");
          case "payment_date":
            return format(new Date(data.payment_date), "LLL d, yyyy");
          case "end_date":
            return format(new Date(data.end_date), "LLL d, yyyy");
          case "created_at":
            return format(new Date(data.created_at), "LLL d, yyyy");
          case "updated_at":
            return format(new Date(data.updated_at), "LLL d, yyyy");
          default:
            return data[field.name];
        }
      }}
    />
  );
};

export default TransactionHistory;
