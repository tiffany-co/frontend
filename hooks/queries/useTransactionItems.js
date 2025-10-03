import {
  createTransactionItem,
  deleteTransactionItem,
  updateTransactionItem,
} from "@/services/transactionItems.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTransactionItemCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransactionItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};

export const useTransactionItemUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransactionItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};

export const useTransactionItemDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransactionItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};
