import GenericEntityPage from "@/components/generic/genericEntityPage";
import {
  useAllBankAccounts,
  useBankAccountCreate,
  useBankAccountUpdate,
  useBankAccountDelete,
} from "@/hooks/queries/useBankAccounts";
import DashboardLayout from "@/layouts/dashboardLayout";

const columns = [
  { field: "name", headerName: "نام حساب" },
  { field: "description", headerName: "توضیحات" },
  { field: "card_number" , headerName: "شماره کارت" },
];

const formFields = [
  {
    id: "name",
    label: "نام حساب",
    rules: { required: "نام حساب اجباری است" },
  },
  {
    id: "description",
    label: "توضیحات",
    rules: { required: "توضیحات اجباری است" },
  },
  {
    id: "card_number",
    label: "شماره کارت",
    rules: {
      required: "شماره کارت اجباری است",
      pattern: {
        value: /^[0-9]{16}$/,
        message: "شماره کارت باید 16 رقم باشد",
      },
    },
  },
];

export default function BankAccounts() {
  return (
    <DashboardLayout>
      <h3>مدیریت کارت‌های بانکی</h3>
      <GenericEntityPage
        entityName="کارت بانکی"
        useAll={useAllBankAccounts}
        useCreate={useBankAccountCreate}
        useUpdate={useBankAccountUpdate}
        useDelete={useBankAccountDelete}
        columns={columns}
        formFields={formFields}
      />
    </DashboardLayout>
  );
}
