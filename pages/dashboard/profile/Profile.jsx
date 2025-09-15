import DashboardLayout from "@/layouts/dashboardLayout";
import React, { useState } from "react";
import { useAuthState } from "@/context/auth/auth-context";
import "./profile.css";

function Profile() {
  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  // const fullName = user.fullName;
  const handleOnClick = () => {};
  return (
    <>
      <DashboardLayout>
        <h3>حساب کاربری</h3>
        <form className=" col-12 col-md-6 row profile-container">
          <label htmlFor="name">نام کاربری</label>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            id="name"
            type="text"
            className=" input-form"
          />
          <label htmlFor="description">نام و نام خانوادگی</label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            className=" input-form"
          />
          <label htmlFor="description">شماره تماس</label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            className=" input-form"
          />
          <label htmlFor="description">رمز جدید</label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            className=" input-form"
          />
          <button
            onClick={() => {
              handleOnClick();
            }}
            className="button-39"
          >
            تایید
          </button>
        </form>
      </DashboardLayout>
    </>
  );
}

export default Profile;
