import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
  createTransaction,
  approveTransaction,
  rejectTransaction,
} from "@/services/transaction.service";

export const useAllTransactions = (filters) => {
  return useQuery(
    ["allTransactions", filters],
    () => getAllTransactions(filters),
    {
      keepPreviousData: true,
    }
  );
};
export const useTransactionCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};
export const useTransactionApprove = () => {
  const queryClient = useQueryClient();
  return useMutation(approveTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};
export const useTransactionReject = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};
export const useTransactionDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};

export const useTransactionUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allTransactions"]);
    },
  });
};
