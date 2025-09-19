import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../inputField";

function FormModal({ defaultValues, isEdit, onSuccess, mutationCreate, mutationUpdate, formFields }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const mutation = isEdit ? mutationUpdate : mutationCreate;
    mutation.mutate(data, {
      onSuccess: () => {
        Swal.fire("", isEdit ? "ویرایش با موفقیت انجام شد" : "ایجاد با موفقیت انجام شد", "success");
        onSuccess?.();
      },
      onError: (error) => {
        Swal.fire("خطا", error.detail || "مشکلی پیش آمد", "error");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-12 col-md-6 row container">
      {formFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type || "text"}
          register={register}
          rules={field.rules}
          error={errors[field.id]}
        />
      ))}

      <button type="submit" className="button-39" disabled={mutationCreate.isPending || mutationUpdate.isPending}>
        {mutationCreate.isPending || mutationUpdate.isPending ? "در حال ذخیره..." : "تأیید"}
      </button>
    </form>
  );
}

export default FormModal;
