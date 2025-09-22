import DashboardLayout from "@/layouts/dashboardLayout";
import GenericEntityPage from "@/components/generic/genericEntityPage";
import {
  useAllUsers,
  useUserCreate,
  useUserUpdate,
  useUserDelete,
} from "@/hooks/queries/useUser";
import { useState } from "react";
import CustomModal from "@/components/customModal";
import { Button } from "@mui/material";
import PermissionsList from "@/components/permissionsList";

export default function UsersManagement() {
  const [selectedUser, setSelectedUser] = useState(null);
  // columns
  const userColumns = [
    { field: "username", headerName: "نام کاربری" },
    { field: "full_name", headerName: "نام کامل" },
    { field: "phone_number", headerName: "شماره تماس" },
    { field: "role", headerName: "نقش" },
    {
      field: "actions",
      headerName: "",
      render: (row) => (
        <Button
          size="small"
          variant="outlined"
          color="info"
          onClick={() => setSelectedUser(row)}
        >
          مشاهده مجوزهای کاربر
        </Button>
      ),
    },
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
      <CustomModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={`مجوزهای ${selectedUser?.full_name || ""}`}
      >
        {selectedUser && (
          <PermissionsList userId={selectedUser.id} isAdminView />
        )}
      </CustomModal>
    </DashboardLayout>
  );
}
