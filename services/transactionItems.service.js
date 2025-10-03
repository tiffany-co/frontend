import http from "@/api/http";

// export const getAllTransactionItems = async () => {
//   const response = await http.get("/transaction-items");
//   return response.data;
// };

export const createTransactionItem = async (data) => {
  const response = await http.post("/transaction-items", data);
  return response.data;
};

export const updateTransactionItem = async ({ id, ...data }) => {
  console.log("URL:", `/transaction-items/${id}`);
  console.log("Data:", data);

  const response = await http.put(`transaction-items/${id}`, data);
  return response.data;
};

// ✅ حذف TransactionItem
export const deleteTransactionItem = async (id) => {
  const response = await http.delete(`transaction-items/${id}`);
  return response.data;
};
