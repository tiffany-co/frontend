import { useState } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";
import AuditLogFilters from "@/components/auditLogFilters";
import AuditLogsTable from "@/components/auditLogsTable";

export default function AuditLogsPage() {
  const [filters, setFilters] = useState({ skip: 0, limit: 50 });

  return (
    <DashboardLayout>
      <h3>لاگ‌های سیستم</h3>
      <AuditLogFilters onChange={(f) => setFilters({ ...filters, ...f })} />
      <AuditLogsTable filters={filters} />
    </DashboardLayout>
  );
}
