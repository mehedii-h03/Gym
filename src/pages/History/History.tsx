import Loader from "@/components/Loader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetHistoryQuery } from "@/redux/api/baseApi";
import HistoryTableHead from "./HistoryTableHead";
import { Slot } from "@/types/types";
import truncateLink from "@/lib/truncateLink";

const History = () => {
  const { data, isLoading, isError } = useGetHistoryQuery("");

  // Showing Loader
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

  return (
    <div className="w-full bg-white p-5 rounded-md">
      {data && data.length > 0 ? (
        <Table>
          <HistoryTableHead />
          <TableBody>
            {data.map((d: Slot, i: number) => (
              <TableRow
                key={d._id}
                className="bg-[#FBFBFB] bg-opacity-80 border-b-[1.5px] border-[#707991] border-opacity-5"
              >
                <TableCell className="pl-5">{i + 1}</TableCell>
                <TableCell>{d?.medical}</TableCell>
                <TableCell>{d?.passport}</TableCell>
                <TableCell>{truncateLink(d.link, 30)}</TableCell>
                <TableCell>{d?.reference}</TableCell>
                <TableCell>{d?.names}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-center py-10">Currently history is empty.</p>
      )}
    </div>
  );
};

export default History;
