import classNames from "classnames";

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  name: string;
  value?: string;
  defaultValue?: string;
};
export const Input = ({
  label,
  placeholder,
  required,
  error,
  name,
  value,
  defaultValue,
}: Props) => {
  return (
    <label className="form-control w-full">
      {!!label && (
        <div className="label">
          <span
            className={classNames("label-text font-medium", {
              "text-error": !!error,
            })}
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </span>
        </div>
      )}
      <input
        required={required}
        name={name}
        type="text"
        placeholder={placeholder}
        className={classNames("input input-bordered w-full", {
          "input-error": !!error,
        })}
        value={value}
        defaultValue={defaultValue}
      />
      {!!error && (
        <div className="label py-1">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </label>
  );
};
