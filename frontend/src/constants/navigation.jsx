import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Building2,
  Settings,
  GraduationCap,
  CalendarCheck,
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
    label: "Students",
    path: "/students",
    icon: GraduationCap,
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
