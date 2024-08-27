import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteRowMutation } from "@/redux/api/baseApi";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const DeleteRow = ({ rowId }: { rowId: string }) => {
  const [deleteRow] = useDeleteRowMutation();
  const { pathname } = useLocation();

  // Delete Handler
  const handlerDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this contact?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Show loading state
        Swal.fire({
          title: "Deleting...",
          text: "Please wait",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        const options = {
          path: pathname,
          id,
        };
        await deleteRow(options).unwrap();
        // Close the loading dialog
        Swal.close();

        // Show success message
        Swal.fire({
          title: "Deleted!",
          text: "Your contact has been deleted.",
        });
      }
    } catch (error) {
      console.error("Error deleting row:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem deleting your contact.",
      });
    }
  };

  return (
    <DropdownMenuItem className="py-1">
      <span className="w-full h-full" onClick={() => handlerDelete(rowId)}>
        Delete
      </span>
    </DropdownMenuItem>
  );
};

export default DeleteRow;
