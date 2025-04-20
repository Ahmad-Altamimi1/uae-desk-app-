import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface ConfirmDeleteDialogProps {
  title?: string;
  message: string;
  itemName: string;
  onDelete: () => Promise<void>;
  html?: HTMLElement;
}

export const ConfirmDeleteDialog = ({
  title,
  message,
  itemName,
  html,
  onDelete,
}: ConfirmDeleteDialogProps) => {
  const handleConfirm = () => {
    MySwal.fire({
      title: title,
      text: `${message}\n"${itemName}"?`,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#EE0303",
      cancelButtonColor: "#b0b0b0",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      html: html
        ? html
        : `<div class="text-sm">
      <span>${message}</span>
      <span class="font-semibold">${itemName}</span></div>`,
      customClass: {
        title: "swal-title text-left",
        htmlContainer: "swal-description text-left text-sm",
        closeButton: "swal-close-btn text-red-500",
        popup: "swal-popup-left rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (onDelete) {
          onDelete();
        } else {
          Swal.fire("Deleted!", `${itemName} has been deleted.`, "success");
        }
      } else {
        Swal.fire("Error!", "Failed to delete the item.", "error");
      }
    });
  };

  return handleConfirm();
};
