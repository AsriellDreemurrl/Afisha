import styles from "./FormTextarea.module.css";

function FormTextarea({ label, id, error, className, style, ...rest }: any) {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <textarea
        id={id}
        className={className ? `${styles.textarea} ${className}` : styles.textarea}
        style={style}
        {...rest}
      />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export default FormTextarea;