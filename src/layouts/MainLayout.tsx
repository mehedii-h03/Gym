import Navbar from "@/components/shared/Navbar/Navbar";
import PassportDataContainer from "@/components/shared/Passport/PassportDataContainer";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSearching, setIsSearching] = useState(false);

  const handleRefresh = () => {
    setIsSearching(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="flex-shrink-0 transition-all duration-300 ease-in-out hover:w-[260px] w-[80px] md:block hidden bg-[#0871D3] group">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Fixed Navbar */}
        <div className="h-[80px] flex-shrink-0">
          <Navbar setIsSearching={setIsSearching} />
        </div>

        {/* Scrollable content area */}
        <div className="flex-grow overflow-auto bg-[#f5f5f5]">
          <div className="p-4 lg:p-8">
            {isSearching ? (
              <div>
                <div
                  onClick={handleRefresh}
                  className="flex gap-2 items-center mb-10 cursor-pointer"
                >
                  <ArrowLeft /> Back
                </div>
                <PassportDataContainer />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
