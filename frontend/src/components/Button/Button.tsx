import styles from "./Button.module.css";

function Button({ children, type, disabled, onClick, className }: any) {
  return (
    <button
      type={type || "button"}
      className={className || styles.btn}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;