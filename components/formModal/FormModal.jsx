import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../inputField";

function FormModal({
  defaultValues,
  isEdit,
  onSuccess,
  mutationCreate,
  mutationUpdate,
  formFields,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
    const mutation = isEdit ? mutationUpdate : mutationCreate;
    //just fields has changed
    let payload = isEdit
      ? Object.keys(dirtyFields).reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {})
      : data;
    if (isEdit && defaultValues?.id) {
      payload.id = defaultValues.id;
    }
    mutation.mutate(payload, {
      onSuccess: () => {
        Swal.fire(
          "",
          isEdit ? "ویرایش با موفقیت انجام شد" : "ایجاد با موفقیت انجام شد",
          "success"
        );
        onSuccess?.();
      },
      onError: (error) => {
        Swal.fire("خطا", error.detail || "مشکلی پیش آمد", "error");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-12 col-md-6 row container"
    >
      {formFields.map((field) => {
        return (
          <InputField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type || "text"}
            as={field.as || "input"}
            control={control}
            options={field.options || []}
            register={register}
            rules={field.rules}
            error={errors[field.id]}
            optionsFrom={field.optionsFrom}
            getOptionLabel={field.getOptionLabel}
            getOptionValue={field.getOptionValue}
          />
        );
      })}

      <button
        type="submit"
        className="button-39"
        disabled={mutationCreate.isPending || mutationUpdate.isPending}
      >
        {mutationCreate.isPending || mutationUpdate.isPending
          ? "در حال ذخیره..."
          : "تأیید"}
      </button>
    </form>
  );
}

export default FormModal;
