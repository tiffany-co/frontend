import http from "@/api/http";

// دریافت مجوزهای خود کاربر
export const getMyPermissions = async () => {
  const response = await http.get("/users/me/permissions");
  return response.data;
};

// دریافت مجوزهای یک کاربر خاص
export const getUserPermissions = async (userId) => {
  const response = await http.get(`/users/${userId}/permissions`);
  return response.data;
};
