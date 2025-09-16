import React, { useState } from "react";
import * as api from "@/api/index";
import "../userExist/simple_form.css";
import Swal from "sweetalert2";
// import Spinner from "../spinner";
import Router from "next/router";
import Logo from "../logo/Logo";
function ForgotPassword({ setForgotPass, phoneNumber }) {
  var numbers = /[0-9]/g;
  var words = /[a-z]/g;
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordAlert, setPasswordAlert] = useState();
  const [token, setToken] = useState();
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordAlert("گذرواژه باید بیشتر از هشت کارکتر باشد");
    } else if (!password.match(numbers)) {
      setPasswordAlert(" گذرواژه باید حاوی عدد باشد");
    } else if (!password.match(words)) {
      setPasswordAlert(" گذرواژه باید حاوی حروف لاتین باشد");
    } else if (password !== confirmPassword) {
      setPasswordAlert("تایید گذرواژه هماهنگ نمی باشد");
    } else {
      setPasswordAlert("");
      const response = await api
        .ResetPassword(password, confirmPassword, token, phoneNumber)
        .then((data) => {
          if (data === "Password is reseted.") {
            Swal.fire({
              toast: true,
              text: "گذرواژه با موفقیت تغییر کرد",
              position: "bottom-right",
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            Router.reload();
          } else if (data.response.status === 400) {
            Swal.fire({
              text: "کد بازیابی گذرواژه صحیح نمی باشد یا منقضی شده است. دوباره تلاش کنید",
              icon: "warning",
            });
            setForgotPass(false);
          }
          console.log(data);
        });
    }
  };
  return (
    <form
      onSubmit={handleChangePassword}
      className="form-content forgot-pass-container"
    >
      <div className="logo-container">
        <Logo />
      </div>
      <div className="form-title">
        <h3 className="forgot-pass-title">فراموشی رمز عبور</h3>
        <p className="text-gray confirm-password">گذرواژه جدید خود وارد کنید</p>
      </div>
      <div className="flex-column">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          placeholder="گذرواژه"
          className="input-form"
          type="password"
        />

        <p className="text-gray confirm-password">تایید گذرواژه جدید </p>
        <input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
          placeholder="تایید گذرواژه"
          className="input-form"
          type="password"
        />
        <p className="text-gray confirm-password">کد بازیابی گذرواژه </p>
        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          required
          placeholder="کد بازیابی"
          className="input-form mb-15"
          type="password"
        />
      </div>
      <button className="button-36">ثبت گذرواژه جدید</button>
      <p className="password-alert text-red-alert">{passwordAlert}</p>
    </form>
  );
}

export default ForgotPassword;
