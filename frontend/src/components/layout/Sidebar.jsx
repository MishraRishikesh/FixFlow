import NavItem from "./NavItem";
import { navigation } from "../../constants/navigation";
import useAuth from "../../hooks/useAuth";

function FixFlowLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 7.5L10 4L14 7.5L18 4L20 6L16 10L20 14L18 16L14 12.5L10 16L6 12.5L4 14.5L2.5 13L6 9.5L2.5 6L4 4.5L6 7.5Z"
            fill="white"
          />
          <path
            d="M10 16L14 12.5L18 16L14 20L10 16Z"
            fill="white"
            fillOpacity="0.75"
          />
        </svg>
      </div>

      <span className="text-2xl font-bold tracking-tight text-blue-600">
        FixFlow
      </span>
    </div>
  );
}

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;

  const visibleNavigation = navigation.filter(item => {
    if (role === "admin") {
      return ["/dashboard", "/hostel"].includes(item.path);
    }

    if (role === "student") {
      return [
        "/dashboard",
        "/complaints",
        "/attendance",
        "/fees",
        "/settings",
      ].includes(item.path);
    }

    if (role === "worker") {
      return ["/dashboard", "/complaints", "/settings"].includes(item.path);
    }

    if (role === "warden") {
      return [
        "/dashboard",
        "/complaints",
        "/staff",
        "/hostel",
        "/students",
        "/attendance",
        "/fees",
        "/settings",
      ].includes(item.path);
    }

    return [];
  });

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <FixFlowLogo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {visibleNavigation.map(item => (
          <NavItem key={item.path} to={item.path} icon={item.icon}>
            {item.label}
          </NavItem>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
