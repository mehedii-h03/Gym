import { Button } from "@/components/ui/button";
import SelectDropDown from "./SelectDropDown";
import AddRow from "./AddRow";
import SlotTableContainer from "./table/SlotTableContainer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGetSlotQuery } from "@/redux/api/baseApi";
// import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

type TSlot = {
  _id: string;
  medical: string;
  passport: string;
  link: string;
  reference: string;
  names: string;
  isPaid: boolean;
};

const Slot = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [isCustomSelecting, setIsCustomSelecting] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [startSerial, setStartSerial] = useState("");
  const [endSerial, setEndSerial] = useState("");
  const { slotPath } = useParams();

  const { data } = useGetSlotQuery(slotPath);
  // const [updateSlotRow] = useUpdateSlotRowMutation();

  // handler Done
  const handleSelectionDone = () => {
    // setIsSelecting(false);
    // setIsCustomSelecting(false);
    setSelectedRows([]);
    setStartSerial("");
    setEndSerial("");
  };

  // Handler for switching selection modes
  const handleSelectionModeChange = (mode: "normal" | "custom") => {
    if (mode === "normal") {
      setIsSelecting((prevState) => !prevState);
      setIsCustomSelecting(false);
    } else {
      setIsCustomSelecting((prevState) => !prevState);
      setIsSelecting(false);
    }
    setSelectedRows([]);
    setStartSerial("");
    setEndSerial("");
  };
  // Handler Custom select
  useEffect(() => {
    if (isCustomSelecting && data) {
      const start = parseInt(startSerial);
      const end = parseInt(endSerial);

      if (!isNaN(start) && !isNaN(end)) {
        const newSelectedRows = data
          .filter((slot: TSlot, index: number) => {
            const serial = index + 1;
            return serial >= start && serial <= end && !slot.isPaid;
          })
          .map((slot: TSlot) => slot._id);

        setSelectedRows(newSelectedRows);
      } else {
        setSelectedRows([]);
      }
    }
  }, [isCustomSelecting, startSerial, endSerial, data]);

  // Handler start
  // const handlerStart = async () => {
  //   try {
  //     const selectedSlots = data?.filter((data: TSlot) =>
  //       selectedRows.includes(data._id)
  //     );

  //     if (!selectedSlots || selectedSlots.length === 0) {
  //       toast.error("No rows selected.");
  //       return;
  //     }

  //     // Update each selected slot
  //     for (const slot of selectedSlots) {
  //       await updateSlotRow({
  //         id: slot._id,
  //         path: `/${slotPath}`,
  //         data: { ...slot, isPaid: true },
  //       }).unwrap();
  //     }

  //     toast.success(`Successfully ${selectedRows.length} paid`);
  //     setIsCustomSelecting(false);
  //     setIsSelecting(false);
  //   } catch (error) {
  //     toast.error("An error occurred while updating the rows.");
  //     console.error("Update error:", error);
  //   }
  // };

  return (
    <section>
      <div
        className={cn("flex justify-between md:items-center mb-4", {
          "flex-col sm:flex-row items-start gap-4": isCustomSelecting,
        })}
      >
        <div className="flex justify-between items-center gap-4">
          <SelectDropDown
            onSelectModeChange={handleSelectionModeChange}
            isSelecting={isSelecting}
            isCustomSelecting={isCustomSelecting}
          />
          {isCustomSelecting && (
            <div className="flex gap-2">
              <Input
                className="border-[1.5px] px-3 py-2 border-[#D0D5DD] rounded-md text-sm text-[#344054] font-normal w-12 text-center"
                placeholder="0"
                value={startSerial}
                onChange={(e) => setStartSerial(e.target.value)}
              />
              <Input
                className="border-[1.5px] px-3 py-2 border-[#D0D5DD] rounded-md text-sm text-[#344054] font-normal w-12 text-center"
                placeholder="0"
                value={endSerial}
                onChange={(e) => setEndSerial(e.target.value)}
              />
            </div>
          )}

          {(isSelecting || isCustomSelecting) && (
            <div>
              <Button
                onClick={handleSelectionDone}
                className={cn("rounded-md text-sm font-medium text-white", {
                  "bg-[#0085FF] hover:bg-[#027cee]": selectedRows.length > 0,
                  "bg-[#B6B6B6] hover:bg-[#B6B6B6]": selectedRows.length === 0,
                })}
                disabled={selectedRows.length === 0}
              >
                Done
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            // onClick={handlerStart}
            variant="outline"
            className="border-[1.5px] border-[#D0D5DD] rounded-md text-sm text-[#344054] font-normal"
          >
            Start
          </Button>
          <AddRow />
        </div>
      </div>
      {slotPath && (
        <SlotTableContainer
          path={slotPath}
          isSelecting={isSelecting}
          isCustomSelecting={isCustomSelecting}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}
    </section>
  );
};

export default Slot;
