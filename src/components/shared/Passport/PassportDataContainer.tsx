import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import truncateLink from "@/lib/truncateLink";
import { cn } from "@/lib/utils";
import ActionsDropDown from "@/pages/Slot/actions/ActionsDropDown";
import TableHeadContainer from "@/pages/Slot/table/TableHeadContainer";
import {
  useAddHistoryMutation,
  useGetPassportQuery,
  useUpdateSlotRowMutation,
} from "@/redux/api/baseApi";
import { useAppSelector } from "@/redux/hooks";
import { Slot } from "@/types/types";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const PassportDataContainer = () => {
  const passportNumber = useAppSelector((state) => state.passport);

  const { data, isLoading, isError } = useGetPassportQuery(passportNumber);
  const [updateSlot] = useUpdateSlotRowMutation();
  const [addHistory] = useAddHistoryMutation();
  const { pathname } = useLocation();

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
        <p className="text-sm text-red-600 text-center py-10">No data found</p>
      </div>
    );
  }

  // Handler payment complete
  const handlePayClick = async (id: string) => {
    try {
      const slotToUpdate = data?.find((slot: Slot) => slot._id === id);
      if (!slotToUpdate) {
        toast.error("Slot not found");
        return;
      }

      const result1 = await updateSlot({
        id,
        path: pathname,
        data: { ...slotToUpdate, isPaid: true },
      }).unwrap();
      const updatedData = { ...slotToUpdate, isPaid: true };
      const result2 = await addHistory(updatedData);

      if (result1 && result2) {
        toast.success("Payment successful");
      }
    } catch (error) {
      console.error("Failed to record payment", error);
      toast.error("Payment failed");
    }
  };

  return (
    <section>
      <div className="w-full bg-white p-5 rounded-md min-h-[screen]">
        {data && data.length > 0 ? (
          <Table>
            <TableHeadContainer />
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
    </section>
  );
};
export default PassportDataContainer;
