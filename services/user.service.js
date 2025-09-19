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

export const createUser = async ({
  username,
  full_name,
  phone_number,
  password,
}) => {
  try {
    const response = await http.post("/users", {
      username,
      full_name,
      phone_number,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await http.get("/users");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await http.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUser = async ({
  id,
  username,
  full_name,
  phone_number,
  password,
}) => {
  try {
    const response = await http.put(`/users/${id}`, {
      username,
      full_name,
      phone_number,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
