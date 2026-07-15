// ===============================
// 1. Imports
// ===============================

import { NavLink } from "react-router-dom";

// ===============================
// 2. Component
// ===============================

function NavItem({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {Icon && <Icon size={20} />}

      <span>{children}</span>
    </NavLink>
  );
}

// ===============================
// 3. Export
// ===============================

export default NavItem;
