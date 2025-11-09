import Swal from "sweetalert2";

// ============================================
// 1️⃣ SUCCESS NOTIFICATION (Auto-close)
// ============================================
export interface SuccessOptions {
  title: string;
  text?: string;
  timer?: number; // Default: 500ms
}

export const showSuccess = async (opts: SuccessOptions) => {
  return Swal.fire({
    icon: "success",
    title: opts.title,
    text: opts.text,
    timer: opts.timer ?? 500,
    showConfirmButton: false,
  });
};

// ============================================
// 2️⃣ CONFIRMATION DIALOG (Yes/No)
// ============================================
export interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: "warning" | "info" | "success" | "error" | "question";
  isDanger?: boolean; // true = red confirm button (for delete actions)
}

export const confirm = async (opts: ConfirmOptions) => {
  const result = await Swal.fire({
    title: opts.title ?? "Are you sure?",
    text: opts.text ?? "",
    icon: opts.icon ?? "warning",
    showCancelButton: true,
    confirmButtonColor: opts.isDanger ? "#d33" : "#3085d6",
    cancelButtonColor: opts.isDanger ? "#6b7280" : "#d33",
    confirmButtonText: opts.confirmButtonText ?? "Yes",
    cancelButtonText: opts.cancelButtonText ?? "Cancel",
  });

  return result.isConfirmed;
};

// ============================================
// 3️⃣ INPUT DIALOG (Get text from user)
// ============================================
export interface InputOptions {
  title: string;
  inputPlaceholder?: string;
  inputValue?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  maxLength?: number;
  validator?: (value: string) => string | null; // Return error message or null if valid
}

export const showInput = async (opts: InputOptions): Promise<string | null> => {
  const { value } = await Swal.fire<string>({
    title: opts.title,
    input: "text",
    inputPlaceholder: opts.inputPlaceholder ?? "Enter value",
    inputValue: opts.inputValue ?? "",
    showCancelButton: true,
    confirmButtonText: opts.confirmButtonText ?? "Submit",
    cancelButtonText: opts.cancelButtonText ?? "Cancel",
    cancelButtonColor: "#d33",
    inputAttributes: {
      maxlength: opts.maxLength?.toString() ?? "100",
      autocapitalize: "off",
      autocorrect: "off",
    },
    preConfirm: (value) => {
      // Basic validation
      if (!value || !value.trim()) {
        Swal.showValidationMessage("This field is required");
        return null;
      }

      // Custom validation
      if (opts.validator) {
        const error = opts.validator(value.trim());
        if (error) {
          Swal.showValidationMessage(error);
          return null;
        }
      }

      return value.trim();
    },
  });

  return value ?? null;
};

// ============================================
// 4️⃣ ERROR MESSAGE
// ============================================
export interface ErrorOptions {
  title: string;
  text?: string;
  confirmButtonText?: string;
}

export const showError = async (opts: ErrorOptions) => {
  return Swal.fire({
    icon: "error",
    title: opts.title,
    text: opts.text,
    confirmButtonText: opts.confirmButtonText ?? "OK",
    confirmButtonColor: "#d33",
  });
};

// ============================================
// 5️⃣ WARNING MESSAGE
// ============================================
export interface WarningOptions {
  title: string;
  text?: string;
  confirmButtonText?: string;
}

export const showWarning = async (opts: WarningOptions) => {
  return Swal.fire({
    icon: "warning",
    title: opts.title,
    text: opts.text,
    confirmButtonText: opts.confirmButtonText ?? "OK",
    confirmButtonColor: "#f59e0b",
  });
};

// ============================================
// 🎯 COMMON USE CASE SHORTCUTS
// ============================================

// Quick success for common actions
export const showCreateSuccess = (itemName: string) =>
  showSuccess({
    title: "Created!",
    text: `${itemName} has been created successfully`,
  });

export const showUpdateSuccess = (itemName: string) =>
  showSuccess({
    title: "Updated!",
    text: `${itemName} has been updated successfully`,
  });

export const showDeleteSuccess = (itemName: string) =>
  showSuccess({
    title: "Deleted!",
    text: `${itemName} has been deleted successfully`,
  });

export const showUploadSuccess = (count: number = 1) =>
  showSuccess({
    title: "Uploaded!",
    text: `${count} file(s) uploaded successfully`,
  });

// Quick confirm for common actions
export const confirmDelete = (itemName: string) =>
  confirm({
    title: "Delete?",
    text: `Are you sure you want to delete "${itemName}"?`,
    icon: "warning",
    confirmButtonText: "Yes, delete it",
    isDanger: true,
  });

export const confirmRemove = (itemName: string) =>
  confirm({
    title: "Remove?",
    text: `Are you sure you want to remove "${itemName}"?`,
    icon: "warning",
    confirmButtonText: "Yes, remove it",
    isDanger: true,
  });

// Quick input for common actions
export const inputFolderName = () =>
  showInput({
    title: "Create New Folder",
    inputPlaceholder: "Enter folder name",
    confirmButtonText: "Create Folder",
    maxLength: 50,
    validator: (value) => {
      const invalidChars = /[<>:"/\\|?*]/;
      if (invalidChars.test(value)) {
        return "Folder name contains invalid characters";
      }
      if (value.length > 50) {
        return "Folder name must be less than 50 characters";
      }
      return null;
    },
  });

export const inputRename = (currentName: string) =>
  showInput({
    title: "Rename",
    inputPlaceholder: "Enter new name",
    inputValue: currentName,
    confirmButtonText: "Rename",
    maxLength: 100,
  });

// Default export for backwards compatibility
export default confirm;
