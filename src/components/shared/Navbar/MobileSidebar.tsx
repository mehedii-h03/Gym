import { Menu } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-white p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
