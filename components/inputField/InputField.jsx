import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
function InputField({
  label,
  id,
  type = "text",
  register,
  control,
  rules,
  error,
  as = "input", // input | select | textarea
  options = [], //  just for select
  optionsFrom,
  getOptionLabel,
  getOptionValue,
  ...rest
}) {
  let selectOptions = options;
  if (optionsFrom && as === "select") {
    const { data } = optionsFrom();
    selectOptions =
      data?.map((item) => ({
        value: getOptionValue(item),
        label: getOptionLabel(item),
      })) || [];
  }
  return (
    <div style={{ width: "100%" }}>
      <label htmlFor={id}>{label}</label>

      {as === "input" && (
        <input
          id={id}
          type={type}
          className={`input-form ${error ? "input-error" : ""}`}
          {...register(id, rules)}
          {...rest}
        />
      )}
      {as === "datepicker" && (
        <Controller
          name={id}
          control={control}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              value={field.value || ""}
              onChange={(val) => {
                field.onChange(val ? val.toDate?.() || val : null);
              }}
              calendar={persian}
              locale={persian_fa}
              inputClass="input-form"
              placeholder="تاریخ را انتخاب کنید"
              {...rest}
            />
          )}
        />
      )}

      {as === "textarea" && (
        <textarea
          id={id}
          className={`input-form ${error ? "input-error" : ""}`}
          {...register(id, rules)}
          {...rest}
        />
      )}

      {as === "select" && (
        <select
          id={id}
          className={`input-form ${error ? "input-error" : ""}`}
          {...register(id, rules)}
          {...rest}
        >
          <option value="">انتخاب کنید...</option>
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {error && (
        <p style={{ color: "red", fontSize: "small", marginTop: "3px" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}

export default InputField;
