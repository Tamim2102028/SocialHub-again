import Swal from "sweetalert2";

export interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  icon?: "warning" | "info" | "success" | "error" | "question";
}

/**
 * Show a confirmation dialog and resolve to true when confirmed.
 * Centralizes Swal usage so components can call this helper.
 */
export const confirm = async (opts: ConfirmOptions) => {
  const result = await Swal.fire({
    title: opts.title ?? "Are you sure?",
    text: opts.text ?? "",
    icon: opts.icon ?? "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: opts.confirmButtonText ?? "Yes",
  });

  return result.isConfirmed;
};

export default confirm;
