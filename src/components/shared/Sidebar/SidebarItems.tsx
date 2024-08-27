import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type SidebarItemsProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const SidebarItems = ({ icon: Icon, label, href }: SidebarItemsProps) => {
  const location = useLocation();

  const isActive = (() => {
    if (location.pathname === "/" && href === "/") {
      return true;
    }

    if (href.startsWith("/slot")) {
      return location.pathname.startsWith(href);
    }

    return (
      location.pathname === href || location.pathname?.startsWith(`${href}/`)
    );
  })();

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-2 text-white text-xs md:text-sm 2xl:text-base transition-all hover:bg-slate-300/20 rounded-sm",
        isActive && "bg-sky-200/20",
        "group-hover:justify-start justify-center px-3 py-4"
      )}
    >
      <Icon size={22} className="text-white flex-shrink-0" />
      <span className="group-hover:inline hidden whitespace-nowrap overflow-hidden">
        {label}
      </span>
    </Link>
  );
};

export default SidebarItems;
