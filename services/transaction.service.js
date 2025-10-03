import http from "@/api/http";

export const getAllTransactions = async (params = {}) => {
  try {
    const { data } = await http.get("/transactions/search/detailed", {
      params: {
        skip: params.skip || 0,
        limit: params.limit || 100,
        status: params.status || null,
        item_transaction_type: params.item_transaction_type || null,
      },
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createTransaction = async ({ contact_id, note, discount }) => {
  try {
    const response = await http.post("/transactions", {
      contact_id: contact_id,
      note: note,
      discount: discount,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const approveTransaction = async (transaction_id) => {
    console.log(transaction_id);
  try {
    const response = await http.post(`/transactions/${transaction_id}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const rejectTransaction = async (transaction_id) => {
    console.log(transaction_id);
  try {
    const response = await http.post(`/transactions/${transaction_id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const { data } = await http.delete(`/transactions/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateTransaction = async ({ id, ...payload }) => {
  try {
    const { data } = await http.put(`/transactions/${id}`, payload);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
