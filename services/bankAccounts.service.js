import http from "@/api/http";

export const getAllBankAccounts = async () => {
  const { data } = await http.get("/bank-accounts");
  return data;
};

export const getBankAccount = async (id) => {
  const { data } = await http.get(`/bank-accounts/${id}`);
  return data;
};

export const createBankAccount = async (payload) => {
  const { data } = await http.post("/bank-accounts", payload);
  return data;
};

export const updateBankAccount = async ({ id, ...payload }) => {
  const { data } = await http.put(`/bank-accounts/${id}`, payload);
  return data;
};

export const deleteBankAccount = async (id) => {
  const { data } = await http.delete(`/bank-accounts/${id}`);
  return data;
};
