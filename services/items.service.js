import http from "@/api/http";

export const getItems = async () => {
  const response = await http.get("/items");
  return response.data;
};