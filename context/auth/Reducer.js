import { getCookie, hasCookie } from "cookies-next";

let initUser = {
  id: null,
  fullName: "string",
  token: "",
  role: "string",
  phoneNumber: "",
  loading: false,
  error: null,
};
let getUserByCookie = null;

if (hasCookie("user")) {
  getUserByCookie = getCookie("user");
  let token = getCookie("token");
  let temp = JSON.parse(getUserByCookie);
  initUser = {
    id: temp.id,
    fullName: temp.fullName,
    token: token,
    role: temp.role,
    phoneNumber: temp.phoneNumber,
    loading: false,
    error: null,
  };
}
export const initalState = initUser;
export const actionType = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT: "LOGOUT",
};

export function reducer(state, action) {
  switch (action.type) {
    case actionType.LOGIN_REQUEST:
      return {
        user: null,
        token: null,
        loading: true,
        error: null,
      };

    case actionType.LOGIN_SUCCESS:
      const { user, token } = action.payload;
      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        token: token,
        role: user.role,
        phoneNumber: user.phoneNumber,
        loading: false,
        error: null,
      };

    case actionType.LOGIN_ERROR:
      return {
        user: null,
        token: null,
        loading: false,
        error: action.type.error,
      };

    case actionType.LOGOUT:
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    default:
      throw Error(`action type not allowed: ${action.type}`);
  }
}
