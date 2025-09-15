import DashboardLayout from "@/layouts/dashboardLayout";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { useCurrentUser, useUserUpdate } from "@/hooks/queries/useCurrentUser";
import Swal from "sweetalert2";

function Profile() {
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [newPass, setNewPass] = useState();
  const userUpdateMutation = useUserUpdate();
  const { data: user } = useCurrentUser();
  useEffect(() => {
    setUsername(user.username);
    setFullName(user.full_name);
    setPhoneNumber(user.phone_number);
  }, [user]);

  const handleOnClick = () => {
    if (phoneNumber.length < 11) {
      Swal.fire("", "فرمت شماره تماس درست نمی باشد", "error");
    } else
      userUpdateMutation.mutate({
        username: username,
        full_name: fullName,
        phone_number: phoneNumber,
        password: newPass,
      });
  };
  return (
    <>
      <DashboardLayout>
        <h3>حساب کاربری</h3>
        <div className=" col-12 col-md-6 row profile-container">
          <label htmlFor="username">نام کاربری</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="name"
            value={username}
            type="text"
            className=" input-form"
          />
          <label htmlFor="description">نام و نام خانوادگی</label>
          <input
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            type="text"
            className=" input-form"
          />
          <label htmlFor="description">شماره تماس</label>
          <input
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            value={phoneNumber}
            type="number"
            className=" input-form"
          />
          <label htmlFor="description">رمز جدید</label>
          <input
            onChange={(e) => {
              setNewPass(e.target.value);
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
        </div>
      </DashboardLayout>
    </>
  );
}

export default Profile;
