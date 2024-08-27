import { MouseEvent, useEffect, useRef, useState } from "react";
import {
  AlarmClockPlus,
  CreditCard,
  FileCheck,
  FilePlus,
  History,
  Hourglass,
  Shield,
  Users,
} from "lucide-react";
import SidebarItems from "./SidebarItems";
import {
  useAddSlotsRouteMutation,
  useDeleteSlotsRoutesMutation,
  useGetSlotRoutesQuery,
} from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

type SlotRoute = {
  _id: string;
  label: string;
  href: string;
};

const SidebarRoutes = () => {
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const { data: routes } = useGetSlotRoutesQuery("");
  const [addSlotsRoute] = useAddSlotsRouteMutation();
  const [deleteSlotsRoute] = useDeleteSlotsRoutesMutation();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [deleteRouteInfo, setDeleteRouteInfo] = useState({
    id: "",
    href: "",
    slot: 1,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Handler click outside of the routes
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target as Node)
      ) {
        setShowDeleteButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, []);

  // Route add handler
  const handlerAddRoute = async () => {
    try {
      const newRoute = {
        label: "Slot",
        href: "slot",
      };
      const result = await addSlotsRoute(newRoute);
      if (result.data) {
        toast.success("New slot added");
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle right-click event
  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement>,
    id: string,
    href: string,
    slot: number
  ) => {
    event.preventDefault();
    setButtonPosition({ x: event.pageX, y: event.pageY });
    setShowDeleteButton(true);
    setDeleteRouteInfo({ id, href, slot });
  };

  // Handle delete button click
  const handleDeleteRoute = async () => {
    try {
      setShowDeleteButton(false);
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this slot?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        await deleteSlotsRoute(deleteRouteInfo).unwrap();

        if (pathname === `/${deleteRouteInfo.href}`) {
          navigate("/cards");
        }
        toast.success("Successfully deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col w-full px-4 mt-4 transition-all duration-300">
      <SidebarItems icon={CreditCard} label={"Cards"} href={"/cards"} />
      {routes?.map((route: SlotRoute, i: number) => (
        <div
          key={i + 1}
          onContextMenu={(event) =>
            handleContextMenu(event, route._id, route.href + (i + 1), i + 1)
          }
          className="relative"
        >
          <SidebarItems
            icon={FileCheck}
            label={`${route.label} ${i + 1}`}
            href={`/${route.href}${i + 1}`}
          />
        </div>
      ))}
      {showDeleteButton && (
        <button
          ref={deleteButtonRef}
          id="delete-button"
          onClick={handleDeleteRoute}
          style={{
            position: "absolute",
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
          }}
          className="z-50 py-2 px-4 bg-white text-[#5F6C72] rounded text-xs"
        >
          Delete
        </button>
      )}
      <button
        type="button"
        className="flex items-center gap-x-2 text-white text-xs md:text-sm 2xl:text-base transition-all hover:bg-slate-300/20 rounded-sm group-hover:justify-start justify-center px-3 py-4 w-full"
        onClick={handlerAddRoute}
      >
        <FilePlus size={22} className="text-white flex-shrink-0" />
        <span className="group-hover:inline hidden whitespace-nowrap overflow-hidden">
          Add Slot
        </span>
      </button>
      <SidebarItems icon={History} label={"History"} href={"/history"} />
      <SidebarItems
        icon={AlarmClockPlus}
        label={"Night Slip"}
        href={"/night-slip"}
      />
      <SidebarItems
        icon={Hourglass}
        label={"Choice Slip"}
        href={"/choice-slip"}
      />
      <SidebarItems icon={Shield} label={"Super Admin"} href={"/super-admin"} />
      <SidebarItems icon={Users} label={"Users"} href={"/users"} />
    </div>
  );
};

export default SidebarRoutes;
