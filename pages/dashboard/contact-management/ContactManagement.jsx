import GenericEntityPage from "@/components/generic/genericEntityPage";
import {
  useAllContacts,
  useContactCreate,
  useContactUpdate,
  useContactDelete,
} from "@/hooks/queries/useContact";
import DashboardLayout from "@/layouts/dashboardLayout";

const columns = [
  { field: "first_name", headerName: "نام" },
  { field: "last_name", headerName: "نام خانوادگی" },
  { field: "national_number", headerName: "کد ملی" },
  { field: "phone_number", headerName: "شماره تماس" },
  { field: "type", headerName: "نوع" },
];

const formFields = [
  { id: "first_name", label: "نام", rules: { required: "نام اجباری است" } },
  {
    id: "last_name",
    label: "نام خانوادگی",
    rules: { required: "نام خانوادگی اجباری است" },
  },
  {
    id: "national_number",
    label: "کد ملی",
    rules: { required: "کد ملی اجباری است" },
  },
  {
    id: "phone_number",
    label: "شماره تماس",
    rules: { required: "شماره تماس اجباری است" },
  },
  { id: "type", label: "نوع", rules: { required: "نوع اجباری است" } },
];

export default function ContactsPage() {
  return (
    <DashboardLayout>
      <h3>مدیریت مخاطبین</h3>
      <GenericEntityPage
        entityName="مخاطبین"
        useAll={useAllContacts}
        useCreate={useContactCreate}
        useUpdate={useContactUpdate}
        useDelete={useContactDelete}
        columns={columns}
        formFields={formFields}
      />
    </DashboardLayout>
  );
}
