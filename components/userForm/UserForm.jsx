import { useForm } from "react-hook-form";
import { useUserCreate, useUserUpdate } from "@/hooks/queries/useUser";
import Swal from "sweetalert2";
import InputField from "../inputField";

function UserForm({ onSuccess, defaultValues, isEdit = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const mutation = isEdit ? useUserUpdate() : useUserCreate();

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        Swal.fire(
          "",
          isEdit
            ? "کاربر با موفقیت ویرایش شد"
            : "کاربر جدید با موفقیت ساخته شد",
          "success"
        );
        onSuccess?.();
      },
      onError: (error) => {
        Swal.fire("خطا", error.detail || "مشکلی پیش اومد", "error");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-12 col-md-6 row container"
    >
      <InputField
        label="نام کاربری"
        id="username"
        register={register}
        rules={{ required: "نام کاربری اجباری است" }}
        error={errors.username}
      />
      <InputField
        label="نام و نام خانوادگی"
        id="full_name"
        register={register}
        rules={{ required: "نام و نام خانوادگی اجباری است" }}
        error={errors.full_name}
      />
      <InputField
        label="شماره تماس"
        id="phone_number"
        type="tel"
        register={register}
        rules={{
          required: "شماره تماس اجباری است",
          pattern: { value: /^[0-9]{10,11}$/, message: "شماره معتبر نیست" },
        }}
        error={errors.phone_number}
      />
      <InputField
        label="رمز عبور"
        id="password"
        type="password"
        register={register}
        rules={{
          required: !isEdit ? "رمز عبور اجباری است" : false,
          minLength: {
            value: 8,
            message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
          },
        }}
        error={errors.password}
      />
      <button type="submit" className="button-39" disabled={mutation.isPending}>
        {mutation.isPending ? "در حال ذخیره..." : "تأیید"}
      </button>
    </form>
  );
}

export default UserForm;
