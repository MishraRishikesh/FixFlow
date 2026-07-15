// ===============================
// 1. Imports
// ===============================

import NavItem from "./NavItem";
import { navigation } from "../../constants/navigation";

// ===============================
// 2. Component
// ===============================

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">FixFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map(item => (
            <NavItem key={item.path} to={item.path} icon={item.icon}>
              {item.label}
            </NavItem>
          ))}
        </nav>
      </nav>
    </aside>
  );
}

export default Sidebar;
