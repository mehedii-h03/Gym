import { FC, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import truncateLink from "@/lib/truncateLink";
import { Slot } from "@/types/types";

import ActionsDropDown from "../actions/ActionsDropDown";
import TableHeadContainer from "./TableHeadContainer";
import {
  // useAddHistoryMutation,
  useGetSlotQuery,
  // useUpdateSlotRowMutation,
} from "@/redux/api/baseApi";
// import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppSelector } from "@/redux/hooks";

interface SlotTableContainerProps {
  path: string;
  isSelecting: boolean;
  isCustomSelecting: boolean;
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}

const SlotTableContainer: FC<SlotTableContainerProps> = ({
  path,
  isSelecting,
  isCustomSelecting,
  selectedRows,
  setSelectedRows,
}) => {
  const { data, isLoading, isError } = useGetSlotQuery(path);
  // const [updateSlot] = useUpdateSlotRowMutation();
  // const [addHistory] = useAddHistoryMutation();
  // const { pathname } = useLocation();

  const activeCard = useAppSelector((state) => state.activeCard.activeCard);

  useEffect(() => {
    console.log("Active Card:", activeCard);
  }, [activeCard]);

  // Handler selecting rows
  const handleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // showing loading component
  if (isLoading) {
    return (
      <div className="w-full bg-white p-5 rounded-md">
        <Loader />
      </div>
    );
  }

  // Showing error
  if (isError) {
    return (
      <div className="w-full bg-white p-5 rounded-md">
        <p className="text-sm text-red-600 text-center py-10">
          Something went wrong
        </p>
      </div>
    );
  }

  // Handler payment complete
  // const handlePayClick = async (id: string) => {
  //   try {
  //     const slotToUpdate = data?.find((slot: Slot) => slot._id === id);
  //     if (!slotToUpdate) {
  //       toast.error("Slot not found");
  //       return;
  //     }

  //     const result1 = await updateSlot({
  //       id,
  //       path: pathname,
  //       data: { ...slotToUpdate, isPaid: true },
  //     }).unwrap();
  //     const updatedData = { ...slotToUpdate, isPaid: true };
  //     const result2 = await addHistory(updatedData);

  //     if (result1 && result2) {
  //       toast.success("Payment successful");
  //     }
  //   } catch (error) {
  //     console.error("Failed to record payment", error);
  //     toast.error("Payment failed");
  //   }
  // };

  const handlePayClick = (id: string) => {
    console.log(id);
    // console.log("Current activeCard:", activeCard);

    if (!activeCard) {
      console.error("No active card available.");
      return;
    }

    const cardDetails = {
      name_on_card: activeCard.name,
      card_number: activeCard.number,
      card_month: `${activeCard.expiry.substring(0, 2)}/`,
      card_year: activeCard.expiry.substring(2),
      cvv_cvc: activeCard.cvc,
    };

    console.log("Prepared cardDetails:", cardDetails);

    window.postMessage(
      {
        type: "PAY_SINGLE_SLIP",
        payload: {
          link: "https://wafid.com/appointment/2lj3ekLOaymnQxv/pay/",
          cardDetails,
        },
      },
      "*"
    );
  };
  return (
    <div className="w-full bg-white p-5 rounded-md">
      {data && data.length > 0 ? (
        <Table>
          <TableHeadContainer
            isSelecting={isSelecting}
            isCustomSelecting={isCustomSelecting}
          />
          <TableBody>
            {data.map((d: Slot, i: number) => (
              <TableRow
                key={d._id}
                className={cn(
                  "bg-[#FBFBFB] bg-opacity-80 border-b-[1.5px] border-[#707991] border-opacity-5",
                  {
                    "bg-[#d3d3d3] hover:bg-[#d3d3d3]": d.isPaid,
                  }
                )}
              >
                {(isSelecting || isCustomSelecting) && (
                  <TableCell className="pl-5">
                    <Checkbox
                      checked={selectedRows.includes(d._id) || d.isPaid}
                      onCheckedChange={() => handleRowSelection(d._id)}
                      className={cn(
                        "",
                        d.isPaid && "text-[#707991] border-[#707991]"
                      )}
                      disabled={d.isPaid}
                    />
                  </TableCell>
                )}
                <TableCell className="pl-5">{i + 1}</TableCell>
                <TableCell className="uppercase">{d?.medical}</TableCell>
                <TableCell>{d?.passport}</TableCell>
                <TableCell>{truncateLink(d.link, 30)}</TableCell>
                <TableCell>{d?.reference}</TableCell>
                <TableCell>{d?.names}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Button
                    className={cn(
                      "text-white bg-[#56D97B] hover:bg-[#3cbc60] disabled:opacity-50",
                      {
                        "bg-[#9B9FAB] text-white": d?.isPaid,
                      }
                    )}
                    size="sm"
                    onClick={() => handlePayClick(d._id)}
                    disabled={d.isPaid}
                  >
                    {d.isPaid ? "Paid" : "Pay"}
                  </Button>
                  <ActionsDropDown rowId={d._id} medical={d?.medical} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-center py-10">
          Currently this slot is empty.
        </p>
      )}
    </div>
  );
};

export default SlotTableContainer;
