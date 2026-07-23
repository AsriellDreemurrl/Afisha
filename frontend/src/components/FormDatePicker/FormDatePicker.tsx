import DatePicker from "react-datepicker";
import styles from "./FormDatePicker.module.css";

function FormDatePicker({
  label, id, value, onChange, error,
  showTimeSelect = true, dateFormat = "Pp", placeholderText, isClearable
}: any) {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={`${styles.dateBox} ${error ? styles.dateBoxError : ""}`}>
        <DatePicker
          id={id}
          locale="ru"
          selected={value}
          onChange={onChange}
          showTimeSelect={showTimeSelect}
          dateFormat={dateFormat}
          placeholderText={placeholderText}
          isClearable={isClearable}
          popperPlacement="bottom-start"
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default FormDatePicker;