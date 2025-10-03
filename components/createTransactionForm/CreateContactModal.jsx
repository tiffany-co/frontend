import { useForm } from "react-hook-form";
import { useContactCreate } from "@/hooks/queries/useContact";
import Swal from "sweetalert2";

export default function CreateContactModal({ onClose }) {
  const contactCreateMutation = useContactCreate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    contactCreateMutation.mutate(data, {
      onSuccess: () => {
        Swal.fire("", "مخاطب با موفقیت ساخته شد", "success");
        onClose();
      },
      onError: (error) => {
        Swal.fire(
          "خطا در ساخت مخاطب",
          error.detail || "مشکلی پیش آمد",
          "error"
        );
      },
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>ساخت مخاطب جدید</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <input
            placeholder="نام"
            {...register("first_name", { required: "نام الزامی است" })}
          />
          {errors.first_name && (
            <div className="error-message">{errors.first_name.message}</div>
          )}

          <input
            placeholder="نام خانوادگی"
            {...register("last_name", { required: "نام خانوادگی الزامی است" })}
          />
          <input
            placeholder="کد ملی"
            {...register(
              "national_number",
              {
                required: "کد ملی الزامی است",
              },
              {
                required: "بیش از 10 باید باشد",
                minLength: 10,
              }
            )}
          />
          <input
            placeholder="شماره تماس"
            {...register("phone_number", {
              minLength: 11,
              required: "شماره تماس الزامی است",
            })}
          />
          <select
            {...register("type", {
              required: "نوع مخاطب را انتخاب کنید",
              validate: (val) =>
                ["customer", "supplier", "investor", "colleague"].includes(
                  val
                ) || "مقدار انتخاب‌شده نامعتبر است",
            })}
            className="input"
          >
            <option value="customer">customer — مشتری</option>
            <option value="supplier">supplier — تامین‌کننده</option>
            <option value="investor">investor — سرمایه‌گذار</option>
            <option value="colleague">colleague — همکار</option>
          </select>

          <div className="form-actions">
            <button type="submit" disabled={contactCreateMutation.isPending}>
              {contactCreateMutation.isPending ? "در حال ذخیره..." : "ایجاد"}
            </button>
            <button type="button" onClick={onClose}>
              بستن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
