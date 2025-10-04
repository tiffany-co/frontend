import GenericEntityPage from "@/components/generic/genericEntityPage";
import DashboardLayout from "@/layouts/dashboardLayout";

import {
  useAllPayments,
  usePaymentCreate,
  usePaymentUpdate,
  usePaymentDelete,
} from "@/hooks/queries/usePayments";

import { useAllContacts } from "@/hooks/queries/useContact";
import { useAllBankAccounts } from "@/hooks/queries/useBankAccounts";
import { useAllTransactions } from "@/hooks/queries/useTransaction";
import { useAllAccountLedgers } from "@/hooks/queries/useAccountLedgers";
import { useAllUsers, useCurrentUser } from "@/hooks/queries/useUser";
import { usePaymentApprove } from "@/hooks/queries/usePayments";
import { usePaymentReject } from "@/hooks/queries/usePayments";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function PaymentsManagement() {
  const paymentApproveMutation = usePaymentApprove();
  const paymentRejectMutation = usePaymentReject();
  const { data: user } = useCurrentUser();
  const columns = [
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      render: (row) => new Date(row.created_at).toLocaleString("fa-IR"),
    },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      render: (row) => new Date(row.updated_at).toLocaleString("fa-IR"),
    },
    { field: "status", headerName: "وضعیت" },
    { field: "amount", headerName: "مبلغ" },
    { field: "payment_method", headerName: "روش پرداخت" },
    { field: "direction", headerName: "جهت تراکنش" },
    { field: "description", headerName: "توضیحات" },
    { field: "contact_id", headerName: "مخاطب" },
    { field: "saved_bank_account_id", headerName: "حساب بانکی" },
    { field: "transaction_id", headerName: "تراکنش" },
    { field: "account_ledger_id", headerName: "دفتر حساب" },
    { field: "recorder_id", headerName: "ثبت شده توسط" },
    { field: "photo_holder_id", headerName: "نگه دارنده عکس فاکتور" },
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
              paymentApproveMutation.mutate(row.id, {
                onSuccess: () => {
                  Swal.fire("", "پرداخت با موفقیت تایید شد", "success");
                },
                onError: (error) => {
                  Swal.fire(
                    "خطا در تایید پرداخت",
                    error.detail || "مشکلی پیش آمد",
                    "error"
                  );
                },
              })
            }
          >
            تایید پرداخت
          </Button>{" "}
          <Button
            size="small"
            style={{ fontSize: "smaller" }}
            variant="contained"
            color="warning"
            onClick={() =>
              paymentRejectMutation.mutate(row.id, {
                onSuccess: () => {
                  Swal.fire(
                    "",
                    "پرداخت با موفقیت به حالت پیش نویس برگردانده شد ",
                    "success"
                  );
                },
                onError: (error) => {
                  Swal.fire(
                    "خطا در بازگشت پرداخت به حالت پیش نویس",
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
        </>
      ),
    },
  ];
  const formFields = [
    {
      id: "amount",
      label: "مبلغ",
      type: "number",
      rules: { required: "مبلغ اجباری است" },
    },
    {
      id: "payment_method",
      label: "روش پرداخت",
      as: "select",
      options: [
        { value: "cash", label: "نقدی" },
        { value: "card_transaction", label: "کارت به کارت" },
        { value: "pos_machin", label: "دستگاه پوز" },
      ],
      rules: { required: "روش پرداخت اجباری است" },
    },
    {
      id: "direction",
      label: "جهت تراکنش",
      as: "select",
      options: [
        { value: "incoming", label: "ورودی" },
        { value: "outgoing", label: "خروجی" },
        { value: "internal_transfer", label: "انتقال داخلی" },
      ],
      rules: { required: "جهت تراکنش اجباری است" },
    },
    {
      id: "description",
      label: "توضیحات",
    },
    {
      id: "contact_id",
      label: "مخاطب",
      as: "select",
      optionsFrom: useAllContacts,
      getOptionLabel: (c) => `${c.first_name} ${c.last_name}`,
      getOptionValue: (c) => c.id,
    },
    {
      id: "saved_bank_account_id",
      label: "حساب بانکی",
      as: "select",
      optionsFrom: useAllBankAccounts,
      getOptionLabel: (b) => `${b.name} - ${b.card_number}`,
      getOptionValue: (b) => b.id,
    },
    {
      id: "transaction_id",
      label: "تراکنش",
      as: "select",
      optionsFrom: useAllTransactions,
      getOptionLabel: (t) => t.note || t.id,
      getOptionValue: (t) => t.id,
    },
    {
      id: "account_ledger_id",
      label: "دفتر حساب",
      as: "select",
      optionsFrom: useAllAccountLedgers,
      getOptionLabel: (a) => `${a.bank_name} (${a.card_number})`,
      getOptionValue: (a) => a.id,
    },
    {
      id: "photo_holder_id",
      label: "نگه دارنده عکس",
      as: "select",
      options: [
        { value: null, label: "نیستم" },
        { value: user.id, label: "هستم" },
      ],
      rules: { required: "جهت تراکنش اجباری است" },
    },
  ];
  // گرفتن داده ها
  const { data: payments = [] } = useAllPayments();
  const { data: users = [] } = useAllUsers();
  const { data: contacts = [] } = useAllContacts();
  const { data: bankAccounts = [] } = useAllBankAccounts();
  const { data: transactions = [] } = useAllTransactions();
  const { data: accountLedgers = [] } = useAllAccountLedgers();

  const rows = payments.map((p) => ({
    ...p,
    contact_id: contacts.find((c) => c.id === p.contact_id)?.last_name || "-",
    saved_bank_account_id:
      bankAccounts.find((b) => b.id === p.saved_bank_account_id)?.name || "-",
    transaction_id:
      transactions.find((t) => t.id === p.transaction_id)?.note || "-",
    account_ledger_id:
      accountLedgers.find((a) => a.id === p.account_ledger_id)?.description ||
      "-",
    recorder_id: users.find((a) => a.id === p.recorder_id)?.full_name || "-",
    photo_holder_id:
      users.find((a) => a.id === p.photo_holder_id)?.full_name || "-",
  }));
  return (
    <DashboardLayout>
      <h3>مدیریت پرداخت‌ها</h3>
      <GenericEntityPage
        entityName="پرداخت"
        useAll={() => ({ data: rows, isLoading: false })}
        useCreate={usePaymentCreate}
        useUpdate={usePaymentUpdate}
        useDelete={usePaymentDelete}
        columns={columns}
        formFields={formFields}
        widthModal={"95%"}
      />
    </DashboardLayout>
  );
}
