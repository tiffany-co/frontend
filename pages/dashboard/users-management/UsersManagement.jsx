import DashboardLayout from "@/layouts/dashboardLayout";
import GenericEntityPage from "@/components/generic/genericEntityPage";
import {
  useAllUsers,
  useUserCreate,
  useUserUpdate,
  useUserDelete,
} from "@/hooks/queries/useUser";

export default function UsersManagement() {
  // columns 
  const userColumns = [
    { field: "username", headerName: "نام کاربری" },
    { field: "full_name", headerName: "نام کامل" },
    { field: "phone_number", headerName: "شماره تماس" },
    { field: "role", headerName: "نقش" },
  ];

  // for UserForm (create/edit)
  const userFormFields = [
    {
      id: "username",
      label: "نام کاربری",
      rules: { required: "نام کاربری اجباری است" },
    },
    {
      id: "full_name",
      label: "نام و نام خانوادگی",
      rules: { required: "نام و نام خانوادگی اجباری است" },
    },
    {
      id: "phone_number",
      label: "شماره تماس",
      rules: {
        required: "شماره تماس اجباری است",
        pattern: { value: /^[0-9]{10,11}$/, message: "شماره معتبر نیست" },
      },
    },
    {
      id: "password",
      label: "رمز عبور",
      type: "password",
      rules: {
        required: "رمز عبور اجباری است",
        minLength: { value: 8, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
      },
    },
    { id: "role", label: "نقش", rules: { required: "نقش اجباری است" } },
  ];

  return (
    <DashboardLayout>
      <h3>مدیریت کاربران</h3>
      <GenericEntityPage
        entityName="کاربر"
        useAll={useAllUsers}
        useCreate={useUserCreate}
        useUpdate={useUserUpdate}
        useDelete={useUserDelete}
        columns={userColumns}
        formFields={userFormFields}
      />
    </DashboardLayout>
  );
}
