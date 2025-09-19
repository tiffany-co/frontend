import Link from "next/link";
import "./mega-menu.css";
import "./main-menu.css";
import React, { useEffect, useState } from "react";
import { useAuthState } from "@/context/auth/auth-context";
import SearchInput from "../searchInput/SearchInput";
import Logo from "../logo/Logo";

function MegaMenu({ backgrondOn, CategoryType }) {
  const [isClient, setIsClient] = useState(false);
  const { token } = useAuthState();
  function changeStyleMenu(transform) {
    if (window.innerWidth < 900) {
      document.getElementById(
        "trigger"
      ).style.transform = `translate(${transform})`;
    }
  }

  useEffect(() => {
    setIsClient(true); // این کد فقط در سمت کلاینت اجرا می‌شود
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <div className={"menu-background"}>
        <div className="row main-menu-container container mega-menu-container">
          <div className="col-4 col-md-1 logo-container logo-mega-menu">
            <Logo isMain={true} />
          </div>
          <div className="col-12 col-lg-4 search-input-container">
            <SearchInput />
          </div>
          <div className="col-12 col-lg-5  menu-item-container">
            <ul className="main-menu">
              <li>
                <Link href={"/shop"}>
                  <p>تست</p>
                </Link>
              </li>
              <li>
                <Link href={""}>
                  <p>درباره ما</p>
                </Link>
              </li>
              <li>
                <Link href={"/contact-us"}>
                  <p>تماس با ما</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="header-btn col-12 col-lg-2">
            <div
              className="mobile-menu-trigger"
              onClick={() => {
                changeStyleMenu("0");
              }}
            >
              <i className="fa fa-bars"></i>
            </div>

            {/* <div className="header-btn-container">
              {!token ? (
                <Link href={"/login"} className="btn">
                  <i className="fa fa-sign-in-alt"></i>ورود | ثبت نام
                </Link>
              ) : (
                <>
                  <Link
                    className="header-btn-item"
                    href={"/dashboard/dashboard-content"}
                  >
                    <i className="fa fa-user-alt"></i>
                  </Link>
                  <Link className="header-btn-item" href={"/checkout/cart"}>
                    {" "}
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                </>
              )}
            </div> */}
          </div>
        </div>
        <div className="menu-container">
        </div>
        {/* mobile */}
        <div className="row bar-container">
          <div className="col-1 col-md-1 logo-container ">
            <Logo isMain={true} />
          </div>
          <div className="col-8 col-md-1">
            <SearchInput />
          </div>
          <div className="col-1 col-lg-2">
            <div
              className="mobile-menu-trigger"
              onClick={() => {
                changeStyleMenu("0");
              }}
            >
              <i className="fa fa-bars"></i>
            </div>
          </div>
          <div id="trigger" className="col-12 col-lg-7  menu-item-container">
            <ul className="main-menu">
              <div
                onClick={() => {
                  changeStyleMenu("-100%");
                }}
                className="mobile-menu-close"
              >
                &times;
              </div>
              <li>
                <Link href={"/"}>
                  <p>تست</p>
                </Link>
              </li>
              <li>
                <Link href={""}>
                  <p>درباره ما</p>
                </Link>
              </li>
              <li>
                <Link href={"/contact-us"}>
                  <p>تماس با ما</p>
                </Link>
              </li>
            </ul>
            <div className="align-self-c">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MegaMenu;
