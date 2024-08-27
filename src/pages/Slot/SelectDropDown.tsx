import { EllipsisVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SelectDropDownProps = {
  onSelectModeChange: (mode: "normal" | "custom") => void;
  isSelecting: boolean;
  isCustomSelecting: boolean;
};

const SelectDropDown = ({
  onSelectModeChange,
  isSelecting,
  isCustomSelecting,
}: SelectDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <span>
          <EllipsisVertical className="size-6 cursor-pointer" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -left-1 top-1 w-36 px-2 rounded-sm shadow-md border-none">
        <DropdownMenuItem className="py-1">
          <span
            className="w-full h-full"
            onClick={() => onSelectModeChange("normal")}
          >
            {isSelecting ? "Cancel Select" : "Select"}
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-1">
          <span
            onClick={() => onSelectModeChange("custom")}
            className="w-full h-full"
          >
            {isCustomSelecting ? "Cancel Custom Select" : "Custom Select"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectDropDown;
