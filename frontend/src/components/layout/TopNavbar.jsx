import { useLocation } from "react-router-dom";
import {
  Building2,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  Settings,
  Shield,
  Users,
} from "lucide-react";

import UserMenu from "./UserMenu";

const pageConfig = {
  "/dashboard": {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  "/complaints": {
    title: "Complaints",
    icon: ClipboardList,
  },
  "/staff": {
    title: "Staff",
    icon: Users,
  },
  "/hostel": {
    title: "Hostel",
    icon: Building2,
  },
  "/students": {
    title: "Students",
    icon: GraduationCap,
  },
  "/attendance": {
    title: "Attendance",
    icon: CalendarCheck,
  },
  "/fees": {
    title: "Fees",
    icon: Receipt,
  },
  "/settings": {
    title: "Settings",
    icon: Settings,
  },
};

function TopNavbar() {
  const { pathname } = useLocation();

  const config = pageConfig[pathname] || {
    title: "FixFlow",
    icon: Shield,
  };

  const PageIcon = config.icon;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <PageIcon size={20} strokeWidth={2} />
        </div>

        <h2 className="text-xl font-semibold text-slate-900">{config.title}</h2>
      </div>

      <UserMenu />
    </header>
  );
}

export default TopNavbar;
