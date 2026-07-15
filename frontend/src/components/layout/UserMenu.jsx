// ===============================
// 1. Imports
// ===============================

import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import useAuth from "../../hooks/useAuth";

// ===============================
// 2. Component
// ===============================

function UserMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        {user?.name
          ?.split(" ")
          .map(word => word[0])
          .join("")
          .slice(0, 2)}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
