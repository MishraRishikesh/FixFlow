import NavItem from "./NavItem";
import { navigation } from "../../constants/navigation";
import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;

  const visibleNavigation = navigation.filter(item => {
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

    return true;
  });

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">FixFlow</h1>
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
