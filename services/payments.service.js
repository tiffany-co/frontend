import http from "@/api/http";

export const createPayment = async (payload) => {
  const { data } = await http.post("/payments", payload);
  return data;
};

export const updatePayment = async ({ id, ...payload }) => {
  const { data } = await http.put(`/payments/${id}`, payload);
  return data;
};

export const deletePayment = async (id) => {
  const { data } = await http.delete(`/payments/${id}`);
  return data;
};

export const getAllPayments = async (query) => {
  const { data } = await http.get(`/payments/search`, {
    params: { query },
  });
  return data;
};

export const approvePayment = async (payment_id ) => {
    
  try {
    const response = await http.post(`/payments/${payment_id }/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const rejectPayment = async (payment_id ) => {
  try {
    const response = await http.post(`/payments/${payment_id }/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
