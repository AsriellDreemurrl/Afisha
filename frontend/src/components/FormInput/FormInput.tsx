import styles from "./FormInput.module.css";

function FormInput({ label, id, type, error, className, style, icon, ...rest }: any) {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.inputBox}>
        {icon && <span className={styles.icon} style={{ backgroundImage: `url(${icon})` }} />}
        <input
          type={type || "text"}
          id={id}
          className={
            icon
              ? `${styles.input} ${styles.withIcon} ${className || ""}`
              : `${styles.input} ${className || ""}`
          }
          style={style}
          {...rest}
        />
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export default FormInput;