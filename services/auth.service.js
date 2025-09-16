import http from "@/api/http";

/**
 * Login with username & password
 * @returns {object} { access_token, token_type }
 */
export const login = async ({ username, password }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", username);
  formData.append("password", password);
  formData.append("scope", "");
  formData.append("client_id", "string");
  formData.append("client_secret", "string");

  const res = await http.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  //save token
  const { access_token, token_type } = res.data;
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("token_type", token_type || "bearer");
  }

  return res.data;
};

/**
 * Logout and delete localStorage
 */
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
};
