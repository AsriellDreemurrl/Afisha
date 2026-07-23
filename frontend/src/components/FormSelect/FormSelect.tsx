import styles from "./FormSelect.module.css";

function FormSelect({ label, id, options, error, className, style, placeholder, value, ...rest }: any) {
  const valueProps = value !== undefined ? { value } : { defaultValue: "" };

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.selectBox}>
        <select
          id={id}
          className={className ? `${styles.select} ${className}` : styles.select}
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
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export default FormSelect;