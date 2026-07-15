import { useLocation } from "react-router-dom";

import UserMenu from "./UserMenu";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/complaints": "Complaints",
  "/staff": "Staff",
  "/hostel": "Hostel",
  "/settings": "Settings",
};

function TopNavbar() {
  const { pathname } = useLocation();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">
        {pageTitles[pathname] || "FixFlow"}
      </h2>

      <UserMenu />
    </header>
  );
}

export default TopNavbar;
