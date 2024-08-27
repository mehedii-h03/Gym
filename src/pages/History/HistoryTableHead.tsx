import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const HistoryTableHead = () => {
  return (
    <TableHeader>
      <TableRow className="border-none hover:bg-transparent">
        <TableHead>Id</TableHead>
        <TableHead>Medical</TableHead>
        <TableHead>Passport</TableHead>
        <TableHead>Link</TableHead>
        <TableHead>Reference</TableHead>
        <TableHead>Names</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default HistoryTableHead;
