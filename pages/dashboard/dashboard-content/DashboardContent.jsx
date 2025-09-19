import React, { useEffect, useState } from "react";
import "./dashboard-content.css";
import DashboardLayout from "@/layouts/dashboardLayout";

export default function DashboardContent() {
  const [currentCounter, setCurrentCounter] = useState(0);
  const [sendingCounter, setSendingCounter] = useState(0);
  const [deliveredCounter, setDeliveredCounter] = useState(0);

  return (
    <DashboardLayout>
      <h3>داشبورد کاربری</h3>
    </DashboardLayout>
  );
}
