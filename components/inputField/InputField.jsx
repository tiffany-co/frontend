function InputField({
  label,
  id,
  type = "text",
  register,
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
