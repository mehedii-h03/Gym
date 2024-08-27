import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteRow from "./DeleteRow";
import EditRowData from "./EditRow";
import ClearRow from "./ClearRow";

const ActionsDropDown = ({
  rowId,
  medical,
}: {
  rowId: string;
  medical: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <span>
          <EllipsisVertical className="size-6 cursor-pointer" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent  align="end" >
        <DropdownMenuItem className="py-1">
          <span>Save</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <EditRowData rowId={rowId} />
        <DropdownMenuSeparator />
        <DeleteRow rowId={rowId} />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-1">
          <ClearRow medical={medical} rowId={rowId} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-1">
          <span>Add</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropDown;
