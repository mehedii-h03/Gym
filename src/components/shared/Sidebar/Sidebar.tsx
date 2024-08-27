import { Button } from "@/components/ui/button";
import SidebarRoutes from "./SidebarRoutes";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/authThunks";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0871D3] text-white shadow-sm border-r overflow-y-auto overflow-x-hidden">
      <div className="p-6 whitespace-nowrap">
        <Link to={"/"} className="text-4xl flex items-center justify-center">
          <span className="group-hover:block hidden">Logo</span>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-full pb-14">
        <SidebarRoutes />
        <div className="px-3 whitespace-nowrap">
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-[#cfc0c0] transition-all duration-75 w-full justify-center group-hover:justify-start"
            onClick={handleLogout}
          >
            <LogOut className="rotate-180 w-6 h-6" />
            <span className="group-hover:inline hidden ml-2">Log Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
