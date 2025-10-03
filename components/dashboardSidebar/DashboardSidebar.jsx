import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./dashboard-sidebar.css";
import toFarsiNumeral from "../../utils/ToFarsiNum";
import { logout } from "@/services/auth.service";
import { useCurrentUser } from "@/hooks/queries/useUser";
import Spinner from "../spinner";
import { useRouter } from "next/navigation";

function Sidebar() {
  const { data: user, isLoading } = useCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isVisibleDis, setisVisibleDis] = useState(false);

  useEffect(() => {
    user?.role == "admin" ? setIsAdmin(true) : setIsAdmin(false);
  }, [user]);
  const router = useRouter();

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {user ? (
        <div className="sidebar-dashboard-container">
          <div className="user-display">
            <i className="fa fa-user-circle fa-3x"></i>
            <div className="user-info">
              <h3>
                {user.full_name === " " ? "نام و نام خانوادگی" : user.full_name}{" "}
                <i
                  onClick={() => {
                    router.replace("/dashboard/profile");
                  }}
                  style={{ color: "gray" }}
                  className="fa fa-pencil-alt"
                ></i>
              </h3>
              <p className="text-gray">
                {toFarsiNumeral(user.phone_number, false)}
              </p>
              <p className="text-gray"> User Role: {user.role}</p>
            </div>
          </div>
          <div className="sidear-dashboard-menu-container">
            <ul className="sidear-dashboard-menu">
              <Link
                className="sidebar-link"
                href={"/dashboard/dashboard-content"}
              >
                <li className="sidear-dashboard-menu-item">
                  <i className="fa fa-home"></i> داشبورد
                </li>
              </Link>
              {isAdmin ? (
                <>
                  <Link
                    className="sidebar-link"
                    href={"/dashboard/users-management"}
                  >
                    <li className="sidear-dashboard-menu-item">
                      <i className="fa fa-user-friends"></i> مدیریت کاربران
                    </li>
                  </Link>
                  <Link className="sidebar-link" href={"/dashboard/audit-logs"}>
                    <li className="sidear-dashboard-menu-item">
                      <i className="fa fa-history sss"></i> لاگ های برنامه
                    </li>
                  </Link>
                </>
              ) : null}
              <Link className="sidebar-link" href={""}>
                <li className="sidear-dashboard-menu-item">
                  <i className="fa fa-file-alt"></i> بیلان معاملات
                </li>
              </Link>
              <li
                onClick={() => {
                  setisVisible(!isVisible);
                }}
                className="sidear-dashboard-menu-item dropdown"
              >
                <div className="sidebar-link" href={""}>
                  <i className="fas fa-chart-pie"></i> سرمایگذاری{" "}
                  <i className="fas fa-angle-left"></i>
                </div>
                <ul
                  className={`dropdown-content ${
                    isVisible ? "dropdown-visible" : null
                  }`}
                >
                  <Link href={""}>
                    <li className="sidear-dashboard-menu-item">
                      لیست دفترچه های سرمایگذاری
                    </li>
                  </Link>
                  <Link href={""}>
                    <li className="sidear-dashboard-menu-item">
                      مقدار قابل پرداخت ماهانه
                    </li>
                  </Link>
                  <Link href={""}>
                    <li className="sidear-dashboard-menu-item">
                      مقدار قابل پرداخت سالانه
                    </li>
                  </Link>
                </ul>
              </li>
              <Link className="sidebar-link" href={"/dashboard/transactions"}>
                <li className="sidear-dashboard-menu-item">
                  <i className="fa fa-money-bill-wave"></i> معاملات
                </li>
              </Link>
              <Link
                className="sidebar-link"
                href={"/dashboard/contact-management"}
              >
                <li className="sidear-dashboard-menu-item">
                  {" "}
                  <i className="fa fa-address-book"></i> مخاطبان{" "}
                </li>
              </Link>
              <Link className="sidebar-link" href={"/dashboard/profile"}>
                <li className="sidear-dashboard-menu-item">
                  {" "}
                  <i className="fa fa-user"></i> حساب کاربری
                </li>
              </Link>
              <Link
                onClick={() => {
                  logout();
                }}
                className="sidebar-link"
                href={"/"}
              >
                <li className="sidear-dashboard-menu-item logout">
                  <i className="fa fa-sign-out-alt"></i> خروج از حساب کاربری
                </li>
              </Link>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
