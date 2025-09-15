import React, { useState } from "react";
import "./login.css";
import Background from "@/components/background";
import Spinner from "@/components/spinner";
import Logo from "@/components/logo/Index";
import "@/components/register/register.css";
import "@/components/userExist/simple_form.css";
import { useLogin } from "@/hooks/queries/useLogin";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { username: userName, password },
      {
        onSuccess: (data) => {
          console.log("Login success");
          router.push(
            router.query.from
              ? decodeURIComponent(router.query.from)
              : "/dashboard/dashboard-content"
          );
          Swal.fire("با موفقیت وارد شدید","","success");

        },
        onError: (error) => {
          console.error("Login error:", error);
          Swal.fire("نام کاربری یا رمز عبور اشتباه است","","error");
        },
      }
    );
  };
  return (
    <>
      <Background />
      <div className="form-container">
        <>
          {isLoading ? <Spinner /> : null}
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="logo-container">
              <Logo />
            </div>
            <div className="form-title">
              <h3>ورود | ثبت نام</h3>
              <p className="text-white">لطفا نام کاربری خود را وارد کنید</p>
            </div>
            <div className="form-input">
              <input
                placeholder="نام کاربری"
                onChange={(e) => {
                  setUserName(e.target.value);
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
            <button className="button-36">ورود</button>
            <button className="forgot-pass-text">فراموشی رمز عبور</button>
          </form>
        </>
      </div>
    </>
  );
}

export default Login;
