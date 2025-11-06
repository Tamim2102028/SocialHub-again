import type {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: "text" | "email" | "password" | "number" | "url" | "tel";
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<T>;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const FormInput = <T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  error,
  register,
  className = "",
  disabled = false,
  autoComplete,
}: FormInputProps<T>) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register(id)}
        className={`w-full rounded-lg border px-4 py-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
