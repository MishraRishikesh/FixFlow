import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Building2,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Complaints",
    path: "/complaints",
    icon: ClipboardList,
  },
  {
    label: "Staff",
    path: "/staff",
    icon: Users,
  },
  {
    label: "Hostel",
    path: "/hostel",
    icon: Building2,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
