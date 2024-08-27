import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const CardsDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <span>
          <EllipsisVertical className="size-6 cursor-pointer" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-1 top-1 w-36 px-2 rounded-sm shadow-md border-none py-4 border-[1.5px] border-[#E4E7E9]">
        <DropdownMenuItem className="py-1">
          <span className="w-full h-full text-[#5F6C72]"> Edit Card</span>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="py-1">
          <span className="w-full h-full text-[#5F6C72]">Delete Card</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardsDropDown;
