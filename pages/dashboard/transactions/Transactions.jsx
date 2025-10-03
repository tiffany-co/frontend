import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";
import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import {
  useAllTransactions,
  useTransactionApprove,
  useTransactionDelete,
  useTransactionReject,
} from "@/hooks/queries/useTransaction";
import CreateTransactionForm from "@/components/createTransactionForm";
import { Button } from "@mui/material";
import "./transactions.css";
import Swal from "sweetalert2";
import { useContact } from "@/hooks/queries/useContact";
import TransactionItemsPage from "@/components/transactionItemsPage";

function ContactCell({ contactId }) {
  const { data: contact, isLoading } = useContact(contactId);
  if (isLoading) return <span>در حال بارگذاری...</span>;
  if (!contact) return <span>مخاطب یافت نشد</span>;

  return (
    <span>
      {contact.first_name} {contact.last_name}
    </span>
  );
}

export default function Transactions() {
  const { data: allTransactions, refetch, isLoading } = useAllTransactions();
  const deleteMutation = useTransactionDelete();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTransactionItems, setSelectedTransactionItems] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState();
  const [itemsModalOpen, setItemsModalOpen] = useState(false);
  const transactionApproveMutation = useTransactionApprove();
  const transactionRejectMutation = useTransactionReject();
  console.log(allTransactions);
  useEffect(() => {
    if (allTransactions) {
      setRows(allTransactions);
    }
  }, [allTransactions]);

  // حذف معامله
  const handleDelete = (id) => {
    Swal.fire({
      text: `آیا مطمئن هستید میخواید این معامله حذف شود؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("حذف شد!", "معامله حذف شد.", "success");
          },
          onError: (error) => {
            Swal.fire("خطا!", error.detail || "مشکلی پیش آمد", "error");
          },
        });
      }
    });
  };

  const handleViewItems = (items, transaction_id) => {
    setSelectedTransactionItems(items || []);
    setSelectedTransactionId(transaction_id);
    setItemsModalOpen(true);
  };

  const columns = [
    {
      field: "contact_id",
      headerName: "مخاطب",
      flex: 1,
      render: (row) => <ContactCell contactId={row.contact_id} />,
    },
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      flex: 1,
      render: (row) => new Date(row.created_at).toLocaleString("fa-IR"),
    },
    { field: "status", headerName: "وضعیت", flex: 1 },
    { field: "total_price", headerName: "قیمت کل", flex: 1/2 },
    { field: "note", headerName: "توضیحات", flex: 1 },
    {
      field: "recorder_id",
      headerName: "ثبت شده توسط",
      flex: 1,
      render: (row) => <ContactCell contactId={row.recorder_id} />,
    },
    {
      field: "items",
      flex: 1,
      sortable: false,
      render: (row) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleViewItems(row.items, row.id)}
        >
          مشاهده آیتم‌ها
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "عملیات",
      sortable: false,
      flex: 2,
      render: (row) => (
        <>
          <Button
            sx={{ marginLeft: 1 }}
            size="small"
            variant="contained"
            color="success"
            onClick={() =>
              transactionApproveMutation.mutate(row.id, {
                onSuccess: () => {
                  Swal.fire("", "معامله با موفقیت تایید شد", "success");
                  // onSuccess?.();
                },
                onError: (error) => {
                  Swal.fire(
                    "خطا در تایید معامله",
                    error.detail || "مشکلی پیش آمد",
                    "error"
                  );
                },
              })
            }
          >
            تایید معامله
          </Button>{" "}
          <Button
            size="small"
            style={{ fontSize: "smaller" }}
            variant="contained"
            color="warning"
            onClick={() =>
              transactionRejectMutation.mutate(row.id, {
                onSuccess: () => {
                  Swal.fire(
                    "",
                    "معامله با موفقیت به حالت پیش نویس برگردانده شد ",
                    "success"
                  );
                },
                onError: (error) => {
                  Swal.fire(
                    "خطا در بازگشت معامله به حالت پیش نویس",
                    error.detail == "This transaction cannot be rejected."
                      ? "معامله هم اکنون در حالت پیش نویس می باشد."
                      : error.detail || "مشکلی پیش آمد",
                    "error"
                  );
                },
              })
            }
          >
            بازگشت به پیشنویس
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(row.id)}
          >
            حذف
          </Button>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <h3>مدیریت معاملات</h3>

      <div className="mb-3">
        <Button
          style={{ fontFamily: "Vaziri", marginBottom: "1rem" }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          ایجاد معامله جدید
        </Button>
      </div>

      <CustomTable columns={columns} data={rows} isLoading={isLoading} />

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="ایجاد معامله جدید"
      >
        <CreateTransactionForm
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </CustomModal>

      <CustomModal
        width={"90%"}
        open={itemsModalOpen}
        onClose={() => setItemsModalOpen(false)}
        title="آیتم‌های معامله"
      >
        <TransactionItemsPage
          transactionItems={selectedTransactionItems}
          transactionId={selectedTransactionId}
          refetch={refetch}
        />
      </CustomModal>
    </DashboardLayout>
  );
}
