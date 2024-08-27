import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TableHeadContainerProps = {
  isSelecting?: boolean;
  isCustomSelecting?: boolean;
};

const TableHeadContainer = ({
  isSelecting,
  isCustomSelecting,
}: TableHeadContainerProps) => {
  return (
    <TableHeader>
      <TableRow className="border-none hover:bg-transparent">
        {(isSelecting || isCustomSelecting) && <TableHead></TableHead>}
        <TableHead>Id</TableHead>
        <TableHead>Medical</TableHead>
        <TableHead>Passport</TableHead>
        <TableHead>Link</TableHead>
        <TableHead>Reference</TableHead>
        <TableHead>Names</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeadContainer;
