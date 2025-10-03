import React, { useState, useEffect } from "react";
import CustomTable from "@/components/customTable";
import CustomModal from "@/components/customModal";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import FormModal from "@/components/formModal";

/**
 * GenericEntityPage
 * Props:
 * - entityName: "users" | "contacts" | ...
 * - useAll: hook (useQuery)
 * - useCreate: hook (useMutation)
 * - useUpdate: hook (useMutation)
 * - useDelete: hook (useMutation)
 * - columns: array columns of table
 * - formFields: FormModal
 */
function GenericEntityPage({
  entityName,
  useAll,
  useCreate,
  useUpdate,
  useDelete,
  columns,
  formFields,
  widthModal,
  refetch,
}) {
  const { data: allData, isLoading } = useAll();
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (allData) setRows(allData);
  }, [allData]);

  const handleDelete = (id, label) => {
    Swal.fire({
      text: `آیا مطمئن هستید میخواید ${label} حذف شود؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "لغو",
    }).then((result) => {
      refetch && refetch();
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("حذف شد!", `${label} حذف شد.`, "success");
          },
          onError: (error) => {
            Swal.fire("خطا!", error.detail || "مشکلی پیش آمد", "error");
          },
        });
      }
    });
  };

  const handleEdit = (item) => {
    refetch && refetch();
    setSelectedItem(item);
    setOpen(true);
  };

  const handleCreate = () => {
    refetch && refetch();
    setSelectedItem(null);
    setOpen(true);
  };

  if (isLoading) return <p>در حال بارگذاری {entityName}‌ها...</p>;

  const tableColumns = [
    ...columns,
    {
      field: "edit",
      headerName: "",
      sortable: false,
      render: (row) => (
        <Button size="small" variant="outlined" onClick={() => handleEdit(row)}>
          ویرایش
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      render: (row) => (
        <Button
          size="small"
          color="error"
          onClick={() =>
            handleDelete(row.id, row.first_name || row.username || row.name)
          }
        >
          حذف
        </Button>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <Button
          style={{ fontFamily: "Vaziri", marginTop: "5px" }}
          variant="contained"
          onClick={handleCreate}
        >
          ایجاد {entityName} جدید
        </Button>
      </div>

      <CustomTable columns={tableColumns} data={rows} />

      <CustomModal
        width={widthModal}
        open={open}
        onClose={() => setOpen(false)}
        title={selectedItem ? `ویرایش ${entityName}` : `ایجاد ${entityName}`}
      >
        {open && (
          <FormModal
            defaultValues={selectedItem}
            isEdit={!!selectedItem}
            onSuccess={() => setOpen(false)}
            mutationCreate={createMutation}
            mutationUpdate={updateMutation}
            formFields={formFields}
          />
        )}
      </CustomModal>
    </>
  );
}

export default GenericEntityPage;
