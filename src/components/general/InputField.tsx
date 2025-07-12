import { Controller, type Control } from "react-hook-form";
import "@styles/authentication/InputField.css";

interface IProps {
  control: Control<any, any>;
  label?: string;
  inputName: string;
  inputType?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputField = ({
  control,
  inputName,
  inputType = "text",
  error,
  label,
  placeholder,
  disabled = false,
}: IProps) => {
  const renderTopRow = () => {
    if (error) {
      return <span className="input-field-error">{error}</span>;
    }
    if (label) {
      return <label className="input-field-label">{label}</label>;
    }
    return null;
  };

  const getInputClassName = () => {
    const baseClass = "input-field-base";
    const errorClass = error ? "input-field-error-state" : "";
    return `${baseClass} ${errorClass}`.trim();
  };

  return (
    <div className="input-field-container">
      {renderTopRow()}

      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            autoComplete="off"
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            className={getInputClassName()}
          />
        )}
      />
    </div>
  );
};

export default InputField;
