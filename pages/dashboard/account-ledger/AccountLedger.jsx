import GenericEntityPage from "@/components/generic/genericEntityPage";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useAllContacts } from "@/hooks/queries/useContact";
import { useAllTransactions } from "@/hooks/queries/useTransaction";
import {
  useAccountLedgerCreate,
  useAccountLedgerDelete,
  useAccountLedgerUpdate,
  useAllAccountLedgers,
} from "@/hooks/queries/useAccountLedgers";

export default function PaymentsManagement() {
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
     {
      field: "deadline",
      headerName: "تاریخ ددلاین حساب",
      render: (row) => new Date(row.deadline).toLocaleString("fa-IR"),
    },
    { field: "contact_id", headerName: "مخاطب" },
    { field: "debt", headerName: "مبلغ" },
    { field: "transaction_id", headerName: "تراکنش" },
    { field: "description", headerName: "توضیحات" },
    { field: "bank_name", headerName: "حساب بانکی" },
    { field: "card_number", headerName: "شماره حساب" },
  ];
  const formFields = [
    {
      id: "contact_id",
      label: "مخاطب",
      as: "select",
      optionsFrom: useAllContacts,
      getOptionLabel: (c) => `${c.first_name} ${c.last_name}`,
      getOptionValue: (c) => c.id,
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
      id: "debt",
      label: "مبلغ",
      type: "number",
      rules: { required: "مبلغ اجباری است" },
    },
    {
      id: "description",
      label: "توضیحات",
    },
    {
      id: "card_number",
      label: "شماره کارت",
    },
    {
      id: "bank_name",
      label: "بانک",
    },
    {
      id: "deadline",
      label: "تاریخ ددلاین",
      as: "datepicker",
      rules: { required: "مبلغ اجباری است" },
    },
  ];
  // گرفتن داده ها
  const { data: contacts = [] } = useAllContacts();
  const { data: transactions = [] } = useAllTransactions();
  const { data: accountLedgers = [] } = useAllAccountLedgers();

  const rows = accountLedgers.map((p) => ({
    ...p,
    contact_id: contacts.find((c) => c.id === p.contact_id)?.last_name || "-",
    transaction_id:
      transactions.find((t) => t.id === p.transaction_id)?.note || "-",
  }));
  return (
    <DashboardLayout>
      <h3>دفتر حساب</h3>
      <GenericEntityPage
        entityName=" حساب"
        useAll={() => ({ data: rows, isLoading: false })}
        useCreate={useAccountLedgerCreate}
        useUpdate={useAccountLedgerUpdate}
        useDelete={useAccountLedgerDelete}
        columns={columns}
        formFields={formFields}
        widthModal={"95%"}
      />
    </DashboardLayout>
  );
}
