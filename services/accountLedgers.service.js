import http from "@/api/http";

export const getAccountLedger = async (id) => {
  const { data } = await http.get(`/account-ledgers/${id}`);
  return data;
};

export const createAccountLedger = async (payload) => {
  const { data } = await http.post("/account-ledgers", payload);
  return data;
};

export const updateAccountLedger = async ({ id, ...payload }) => {
  const { data } = await http.put(`/account-ledgers/${id}`, payload);
  return data;
};

export const deleteAccountLedger = async (id) => {
  const { data } = await http.delete(`/account-ledgers/${id}`);
  return data;
};

export const getAllAccountLedgers = async (query) => {
  const { data } = await http.get(`/account-ledgers/search`, {
    params: { query },
  });
  return data;
};
