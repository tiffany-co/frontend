import {
  createPayment,
  deletePayment,
  getPayment,
  updatePayment,
  getAllPayments,
  approvePayment,
  rejectPayment,
} from "@/services/payments.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const usePayment = (id) => {
  return useQuery(["payment", id], () => getPayment(id), {
    enabled: !!id,
    onError: (error) => error,
  });
};

export const usePaymentCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(createPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allPayments"]);
    },
    onError: (error) => error,
  });
};

export const usePaymentUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allPayments"]);
    },
    onError: (error) => error,
  });
};

export const usePaymentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allPayments"]);
    },
    onError: (error) => error,
  });
};

export const useAllPayments = (query) => {
  return useQuery(["allPayments", query], () => getAllPayments(query), {
    // enabled: !!query,
    onError: (error) => error,
  });
};

export const usePaymentApprove = () => {
  const queryClient = useQueryClient();
  return useMutation(approvePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allPayments"]);
    },
  });
};
export const usePaymentReject = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allPayments"]);
    },
  });
};
