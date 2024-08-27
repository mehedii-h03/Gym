import { SetStateAction } from "react";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "./NavbarRoutes";

const Navbar = ({
  setIsSearching,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className="py-4 px-8 border-b h-full flex md:block items-center bg-white border-none">
      <MobileSidebar />
      <NavbarRoutes setIsSearching={setIsSearching} />
    </nav>
  );
};

export default Navbar;
