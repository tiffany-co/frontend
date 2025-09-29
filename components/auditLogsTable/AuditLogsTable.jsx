import CustomTable from "@/components/customTable";
import { useAuditLogs } from "@/hooks/queries/useAuditLog";
import Swal from "sweetalert2";

export default function AuditLogsTable({ filters }) {
  const { data: logs, isLoading } = useAuditLogs(filters);
  
  const buildTable = (obj) => {
    if (!obj) return "<p style='color:gray'>ندارد</p>";
    let rows = Object.entries(obj)
      .map(
        ([key, value]) =>
          `<tr><td style="padding:4px; border:1px solid #ccc"><b>${key}</b></td>
           <td style="padding:4px; border:1px solid #ccc">${value}</td></tr>`
      )
      .join("");
    return `
      <table style="border-collapse:collapse; width:100%; margin-bottom:12px; text-align:right; direction:rtl">
        <thead>
          <tr>
            <th style="border:1px solid #ccc; padding:4px">کلید</th>
            <th style="border:1px solid #ccc; padding:4px">مقدار</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  };

  const columns = [
    {
      field: "created_at",
      headerName: "تاریخ",
      render: (row) => new Date(row.created_at).toLocaleString("fa-IR"),
    },
    { field: "user_id", headerName: "شناسه کاربر" },
    { field: "operation", headerName: "عملیات" },
    { field: "table_name", headerName: "نام جدول" },
    {
      field: "details",
      headerName: "جزئیات",
      render: (row) => (
        <button
          className="button-39"
          onClick={() =>
            Swal.fire({
              title: `<strong>جزئیات فعالیت (${row.table_name})</strong>`,
              html: `
                <h3 style="margin:8px 0">قبل از تغییر</h3>
                ${buildTable(row.before_state)}
                <h3 style="margin:8px 0">بعد از تغییر</h3>
                ${buildTable(row.after_state)}
              `,
              width: "95vw",
              showCloseButton: true,
              confirmButtonText: "بستن",
            })
          }
        >
          مشاهده
        </button>
      ),
    },
  ];

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!logs || logs.length === 0) return <p>هیچ لاگی موجود نیست</p>;

  return <CustomTable columns={columns} data={logs} />;
}
