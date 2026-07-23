import styles from "./FormTextarea.module.css";

function FormTextarea({ label, id, error, className, style, ...rest }: any) {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <textarea
        id={id}
        className={`${styles.textarea} ${error ? styles.textareaError : ""} ${className || ""}`}
        style={style}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default FormTextarea;