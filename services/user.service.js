import http from "@/api/http";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const response = await http.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};
