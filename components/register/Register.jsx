import React, { useState } from "react";
import * as api from "@/api/index";
import "./register.css";
import Swal from "sweetalert2";
import { useAuthDispatch } from "../../context/auth/auth-context";
import { actionType } from "../../context/auth/Reducer";
import axios from "axios";
import Spinner from "../spinner";
import Logo from "../logo/Logo";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

function Register({ phoneNumber, setPhoneNumber, setIsRegistered }) {
  var words = /[a-z]/g;
  const [password, setPassword] = useState();
  const dispatch = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // for login action
  const handleLogin = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 11) {
      Swal.fire("", "شماره نامعتبر است", "error");
    } else if (password.length < 6 || !password.match(words)) {
      Swal.fire(
        "",
        "گذرواژه باید بیشتر از 6 کارکتر و شامل حروف a تا z باشد",
        "error"
      );
      return;
    }
    setIsLoading(true);
    const response = await api
      .UserIdentification(phoneNumber, password)
      .then(({ data, status }) => {
        if (!data && status === 200) {
          //route to verify code
          setIsRegistered(false);
          return;
        }
        api
          .refreshToken(data.accessToken, data.refreshToken)
          .then(({ data: token }) => {
            // console.log(token);
            // console.log(data.accessToken);
            setCookie("token", token.accessToken);
            axios.defaults.headers.common = {
              Authorization: `Bearer ${token.accessToken}`,
            };
            api.GetUserInfo().then((data) => {
              setCookie("user", data);
              dispatch({
                type: actionType.LOGIN_SUCCESS,
                payload: {
                  user: data,
                  token: token.accessToken,
                },
              });
              if (token.accessToken) {
                console.log(token);
                router.push(
                  router.query.from
                    ? decodeURIComponent(router.query.from)
                    : "/dashboard/dashboard-content"
                );
              }
            });
          });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("", "اطلاعات وارد شده صحیح نمی باشد!", "error");
      });
  };

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {forgotPass ? (
        <ForgotPassword
          setForgotPass={setForgotPass}
          phoneNumber={phoneNumber}
        />
      ) : (
        <form className="form-content" onSubmit={handleLogin}>
          <div className="logo-container">
            <Logo />
          </div>
          <div className="form-title">
            <h3>ورود | ثبت نام</h3>
            <p className="text-white">لطفا شماره موبایل خود را وارد کنید</p>
          </div>
          <div className="form-input">
            <input
              placeholder="شماره موبایل"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              required
              className="input-form"
              type="text"
            />
          </div>
          <div className="form-input">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="گذرواژه"
              className="input-form"
              type={showPassword ? "text" : "password"}
            />
            <i
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className={`show-pass fa ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } text-gray show-pass-icon`}
            ></i>
          </div>
          <button className="button-36">ادامه</button>
          {/* <p className="password-alert text-red-alert">{passwordAlert}</p> */}
          <button
            onClick={() => {
              if (phoneNumber) {
                Swal.fire({
                  toast: true,
                  text: "کد بازیابی پسورد به شماره همراه شما ارسال شد",
                  position: "bottom-right",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
                api.ForgotPassword(phoneNumber);
                setForgotPass(true);
              } else {
                Swal.fire(
                  "",
                  "شماره خود را وارد کنید سپس روی فراموشی رمز کلیک کنید",
                  "info"
                );
              }
            }}
            className="forgot-pass-text"
          >
            فراموشی رمز عبور
          </button>
        </form>
      )}
    </>
  );
}

export default Register;
