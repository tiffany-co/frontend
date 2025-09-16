"use client";
import React from "react";
import Head from "next/head";
import DashboardContent from "./dashboard/dashboard-content";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Gold Shop",
    description: "Gold Shop pp",
  };
}
function Index() {
  return (
    <>
      <Head>
        <title>Gold Shop</title>
        <meta charSet="utf-8" />
        <meta name="enamad" content="766908" />
      </Head>
      <DashboardContent />
    </>
  );
}

export default Index;
