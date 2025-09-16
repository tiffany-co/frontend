import React, { useState } from "react";
import * as api from "@/api/index";
import "./simple_form.css";
import Link from "next/link";
import Swal from "sweetalert2";
import Spinner from "../spinner";
import Logo from "../logo/Logo";
function UserExist({
  setIsValidInfo,
  phoneNumber,
  setPhoneNumber,
  setIsVerified,
  setIsRegistered,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await api.postUserExist(phoneNumber);
    if (data.status === 200 && data.data === true) {
      setIsVerified(true);
    } else if (data.status === 200) {
      setIsRegistered(true);
      setIsValidInfo(true);
      setIsLoading(false);
    } else if (data.response.data === "Use phone number for create account") {
      Swal.fire("", "از شماره موبایل برای ثبت نام استفاده کنید", "info");
    } else {
      Swal.fire("", "شماره وارد شده صحیح نمی باشد!", "error");
    }
  };

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <form className="form-content">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="form-title">
          <h3>ورود | ثبت نام</h3>
          <p className="text-gray">لطفا شماره موبایل خود را وارد کنید</p>
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
        <button
          onClick={(e) => {
            handleLogin(e);
          }}
          className="button-36"
        >
          ورود
        </button>
      </form>
    </>
  );
}

export default UserExist;
