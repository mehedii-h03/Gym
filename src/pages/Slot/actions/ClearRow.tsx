import { MouseEvent } from "react";
import { useUpdateSlotRowMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const ClearRow = ({ rowId, medical }: { rowId: string, medical: string }) => {
  const [updateSlot] = useUpdateSlotRowMutation();
  const { pathname } = useLocation();

  // Clear handler
  const handleClearClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const clearedData = {
      medical,
      passport: "",
      names: "",
      link: "",
      reference: "",
      isPaid: false,
    };

    const options = {
      path: pathname,
      id: rowId,
      data: clearedData,
    };

    try {
      const result = await updateSlot(options).unwrap();

      if (result) {
        toast.success("Slot cleared successfully");
      }
    } catch (error) {
      console.error("Failed to clear slot", error);
      toast.error("Failed to clear slot");
    }
  };

  return (
    <span className="w-full h-full" onClick={handleClearClick}>
      Clear
    </span>
  );
};

export default ClearRow;
