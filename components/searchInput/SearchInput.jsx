import React, { useState } from "react";
import { Box, List, ListItem } from "@mui/material";
import "./search-input.css";
import Spinner from "../spinner";
import Image from "next/image";
import { useRouter } from "next/router";
const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState();
  const router = useRouter();
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  const handleClose = () => {
    setSearchTerm("");
  };
  return (
    <Box sx={{ zIndex: 10, position: "relative", margin: "20px auto" }}>
      {/* اورلی بک‌گراند شیشه‌ای */}
      {searchTerm && (
        <Box
          onClick={handleClose}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // رنگ مشکی نیمه‌شفاف
            backdropFilter: "blur(4px)", // شفافیت شیشه‌ای
          }}
        />
      )}
      <div className="form">
        <label>
          <input
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => {
              handleChange(e);
            }}
            className="input"
            type="text"
            placeholder="جستجو "
            id="search"
          />
          <div className="fancy-bg"></div>
          <div className="search">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </div>
        </label>
      </div>
      {searchTerm && (
        <Box
          sx={{
            padding: "10px",
            position: "absolute",
            width: "100%",
            backgroundColor: "white",
            boxShadow: 6,
            maxHeight: 500,
            overflowY: "auto",
            borderRadius: "4px",
          }}
        >
          {searchResult ? (
            <List>
              <h5>جست و جو در دسته بندی ها</h5>
              {searchResult.categoryResults &&
              searchResult.categoryResults[0] ? (
                searchResult.categoryResults.map((item, index) => (
                  <ListItem
                    onClick={() => {
                      router.query = item.id;
                      router.push(`/shop/products/${item.id}`);
                    }}
                    key={item.id}
                    button
                  >
                    <p>
                      {" "}
                      <i className="fa fa-search"></i> دسته بندی {item.name}
                    </p>
                  </ListItem>
                ))
              ) : (
                <List>
                  <ListItem>
                    <p>نتیجه ای یافت نشد!</p>
                  </ListItem>
                </List>
              )}
            </List>
          ) : (
            <Spinner />
          )}
          <hr />
          {searchResult ? (
            <List>
              <h5>جست و جو در محصولات</h5>
              {searchResult.productResults && searchResult.productResults[0] ? (
                searchResult.productResults.map((item, index) => (
                  <ListItem
                    onClick={() => {
                      router.query.product = item.id;
                      router.push(`/shop/products/singleProduct/${item.id}`);
                    }}
                    key={item.id}
                    button
                  >
                    <Image src={item.imageUrl} width={100} height={90} />
                    <p>{item.name}</p>
                  </ListItem>
                ))
              ) : (
                <List>
                  <ListItem>
                    <p>نتیجه ای یافت نشد!</p>
                  </ListItem>
                </List>
              )}
            </List>
          ) : (
            <Spinner />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;
