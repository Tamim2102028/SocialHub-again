import type {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<T>;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

export const FormTextarea = <T extends FieldValues>({
  id,
  label,
  placeholder,
  required = false,
  error,
  register,
  className = "",
  disabled = false,
  rows = 4,
}: FormTextareaProps<T>) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...register(id)}
        className={`w-full rounded-lg border px-4 py-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
