import http from "@/api/http";

export const getCurrentUser = async () => {
  const response = await http.get("/users/me");

  return response.data;
};
export const updateCurrentUser = async ({
  username,
  full_name,
  phone_number,
  password,
  //   is_active,
}) => {
  const response = await http.put("/users/me", {
    username: username,
    full_name: full_name,
    phone_number: phone_number,
    password: password,
    // is_active,
  });

  return response.data;
};
