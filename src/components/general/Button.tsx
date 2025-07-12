interface IProps {
  variant: "primary" | "secondary" | "danger" | "light";
  type: "submit" | "button";
  label: any;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  variant,
  type,
  label,
  onClick,
  loading,
  disabled,
}: IProps) => {
  const classNameCreator = (): string => {
    let className = "btn";

    switch (variant) {
      case "primary":
        className += " btn-primary";
        break;
      case "secondary":
        className += " btn-secondary";
        break;
      case "danger":
        className += " btn-danger";
        break;
      case "light":
        className += " btn-light";
        break;
    }

    return className;
  };

  const loadingIconCreator = () => {
    return <div className="loading-spinner"></div>;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNameCreator()}
      disabled={disabled}
    >
      {loading ? loadingIconCreator() : label}
    </button>
  );
};

export default Button;
