import React, { useEffect, useState } from "react";
import CustomTable from "@/components/customTable";
import { useAllUsers, useUserDelete } from "@/hooks/queries/useUser";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import CustomModal from "../customModal";
import UserForm from "../userForm";

function UsersTable() {
  const { data: allUsers, isLoading } = useAllUsers();
  const deleteMutation = useUserDelete();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //update rows when allUsers changed
  useEffect(() => {
    if (allUsers) setRows(allUsers);
  }, [allUsers]);

// delete user
  const handleDelete = (id, username) => {
    Swal.fire({
      text: `آیا مطمئن هستید میخواید ${username} حذف شود؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("حذف شد!", `${username} حذف شد.`, "success");
          },
          onError: (error) => {
            Swal.fire("خطا!", error.detail || "مشکلی پیش آمد", "error");
          },
        });
      }
    });
  };

  //open modal for edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const columns = [
    { field: "username", headerName: "نام کاربری" },
    { field: "full_name", headerName: "نام کامل" },
    { field: "phone_number", headerName: "شماره تماس" },
    { field: "role", headerName: "نقش" },
    {
      field: "actions",
      headerName: "",
      render: (row) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(row)}
          >
            ویرایش
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(row.id, row.username)}
          >
            حذف
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>در حال بارگذاری کاربران...</p>;

  return (
    <>
      <CustomTable columns={columns} data={rows} />

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title={`ویرایش کاربر ${selectedUser?.username || ""}`}
      >
        {selectedUser && (
          <UserForm
            defaultValues={selectedUser}
            isEdit
            onSuccess={() => setOpen(false)}
          />
        )}
      </CustomModal>
    </>
  );
}

export default UsersTable;
