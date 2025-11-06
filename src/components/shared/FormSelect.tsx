import type {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  options: SelectOption[];
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<T>;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const FormSelect = <T extends FieldValues>({
  id,
  label,
  options,
  required = false,
  error,
  register,
  className = "",
  disabled = false,
  placeholder,
}: FormSelectProps<T>) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        disabled={disabled}
        {...register(id)}
        className={`w-full rounded-lg border px-4 py-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
