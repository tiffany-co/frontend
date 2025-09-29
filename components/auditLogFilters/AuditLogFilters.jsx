import { Input } from "@mui/material";
import { useState } from "react";

export default function AuditLogFilters({ onChange }) {
  const [userId, setUserId] = useState("");
  const [operation, setOperation] = useState("");
  const [tableName, setTableName] = useState("");

  const handleFilter = () => {
    onChange({
      user_id: userId || undefined,
      operation: operation || undefined,
      table_name: tableName || undefined,
    });
  };

  return (
    <div
      className="filters row"
      style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
    >
      <Input
        placeholder="شناسه کاربر"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <select
        style={{ padding: "3px" }}
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="">همه عملیات</option>
        <option value="CREATE">ایجاد</option>
        <option value="UPDATE">ویرایش</option>
        <option value="DELETE">حذف</option>
      </select>
      <Input
        placeholder="نام جدول"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />
      <button className="button-39" onClick={handleFilter}>
        اعمال فیلتر
      </button>
    </div>
  );
}
