import {
  createAccountLedger,
  deleteAccountLedger,
  getAccountLedger,
  updateAccountLedger,
  getAllAccountLedgers,
} from "@/services/accountLedgers.service";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAccountLedger = (id) => {
  return useQuery(["accountLedger", id], () => getAccountLedger(id), {
    enabled: !!id,
    onError: (error) => error,
  });
};

export const useAccountLedgerCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(createAccountLedger, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allAccountLedgers"]);
    },
    onError: (error) => error,
  });
};

export const useAccountLedgerUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAccountLedger, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allAccountLedgers"]);
    },
    onError: (error) => error,
  });
};

export const useAccountLedgerDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAccountLedger, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allAccountLedgers"]);
    },
    onError: (error) => error,
  });
};

export const useAllAccountLedgers = (query) => {
  return useQuery(
    ["allAccountLedgers", query],
    () => getAllAccountLedgers(query),
    {
      // enabled: !!query,
      onError: (error) => error,
    }
  );
};
