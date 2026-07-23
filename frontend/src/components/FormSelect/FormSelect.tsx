import styles from "./FormSelect.module.css";

function FormSelect({ label, id, options, error, className, style, placeholder, value, ...rest }: any) {
  const valueProps = value !== undefined ? { value } : { defaultValue: "" };

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.selectBox}>
        <select
          id={id}
          className={`${styles.select} ${error ? styles.selectError : ""} ${className || ""}`}
          style={style}
          {...valueProps}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default FormSelect;