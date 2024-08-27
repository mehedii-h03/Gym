import { SetStateAction, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/redux/hooks";
import { setPassportNumber } from "@/redux/features/passportNumberSlice";

const NavbarRoutes = ({
  setIsSearching,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [passport, setPassport] = useState("");
  const dispatch = useAppDispatch();

  const handleSetPassport = () => {
    dispatch(setPassportNumber(passport));
    setIsSearching(true);
  };

  return (
    <div className="flex items-center justify-between gap-x-2 ml-auto">
      <div className="w-full max-w-[425px] relative hidden md:flex gap-3 items-center">
        <Input
          type="text"
          placeholder="Search.."
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
          className="border-none rounded-md placeholder:text-[#AFAFAF] w-[70%] bg-[#F5F7F9]"
        />
        <button
          onClick={handleSetPassport} // Correct the onClick function call
          className="flex gap-2 items-center bg-[#0085FF] px-2 py-2 rounded-md text-sm text-white h-full"
        >
          Search
          <Search className="size-4" />
        </button>
      </div>

      <div className="flex gap-6 items-center">
        <Bell className="size-5 cursor-pointer text-[#707991]" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavbarRoutes;
