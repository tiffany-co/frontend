import { useForm } from "react-hook-form";
import { useAllContacts } from "@/hooks/queries/useContact";
import { useTransactionCreate } from "@/hooks/queries/useTransaction";
import Swal from "sweetalert2";
import { useState } from "react";
import CreateContactModal from "./CreateContactModal";
import "./create-transaction-form.css";

export default function CreateTransactionForm({ onSuccess }) {
  const { data: contacts, refetch, isLoading } = useAllContacts();
  const transactionCreateMutation = useTransactionCreate();

  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact_id: "",
      note: "",
      discount: 0,
    },
  });

  const onSubmit = (data) => {
    transactionCreateMutation.mutate(data, {
      onSuccess: (res) => {
        Swal.fire("", " با موفقیت ساخته شد", "success");
      },
      onError: (error) => {
        Swal.fire("خطا در ساخت ", error?.detail || "مشکلی پیش آمد", "error");
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="transaction-form">
        <div className="form-group">
          <label htmlFor="contact_id" className="form-label">
            مخاطب
          </label>
          <div className="form-group">
            <button
              type="button"
              className="btn-small btn-outline"
              onClick={() => setContactModalOpen(true)}
            >
              + ساخت مخاطب جدید
            </button>
          </div>
          <select
            id="contact_id"
            className="form-select input-global"
            {...register("contact_id", { required: "انتخاب مخاطب الزامی است" })}
            disabled={isLoading}
          >
            <option value="">انتخاب کنید</option>
            {contacts?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name} ({c.phone_number})
              </option>
            ))}
          </select>
          {errors.contact_id && (
            <div className="error-message">{errors.contact_id.message}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="note" className="form-label">
            توضیحات
          </label>
          <textarea
            id="note"
            rows={3}
            className="form-textarea input-global"
            {...register("note")}
            placeholder="توضیحاتی برای معامله"
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount" className="form-label">
            تخفیف
          </label>
          <input
            id="discount"
            type="number"
            className="form-input input-global"
            {...register("discount", { valueAsNumber: true })}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={transactionCreateMutation.isPending}
          >
            {transactionCreateMutation.isPending
              ? "در حال ذخیره..."
              : "ایجاد معامله"}
          </button>
        </div>
      </form>

      {isContactModalOpen && (
        <CreateContactModal
          onCreated={(newContact) => {
            refetch();
            setValue("contact_id", newContact.id);
            setContactModalOpen(false);
          }}
          onClose={() => setContactModalOpen(false)}
        />
      )}
    </>
  );
}
