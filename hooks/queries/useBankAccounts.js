import {
  createBankAccount,
  deleteBankAccount,
  getAllBankAccounts,
  getBankAccount,
  updateBankAccount,
} from "@/services/bankAccounts.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAllBankAccounts = () => {
  return useQuery(["allBankAccounts"], getAllBankAccounts, {
    onError: (error) => error,
  });
};

export const useBankAccount = (id) => {
  return useQuery(["bankAccount", id], () => getBankAccount(id), {
    enabled: !!id,
    onError: (error) => error,
  });
};

export const useBankAccountCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(createBankAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allBankAccounts"]);
    },
    onError: (error) => error,
  });
};

export const useBankAccountUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBankAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allBankAccounts"]);
    },
    onError: (error) => error,
  });
};

export const useBankAccountDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBankAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allBankAccounts"]);
    },
    onError: (error) => error,
  });
};
