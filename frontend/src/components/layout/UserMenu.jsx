import { useNavigate } from "react-router-dom";
import { GraduationCap, HardHat, LogOut, ShieldCheck } from "lucide-react";

import useAuth from "../../hooks/useAuth";

function UserMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const roleConfig = {
    student: {
      icon: GraduationCap,
      className: "bg-blue-100 text-blue-600",
    },

    worker: {
      icon: HardHat,
      className: "bg-orange-100 text-orange-600",
    },

    warden: {
      icon: ShieldCheck,
      className: "bg-purple-100 text-purple-600",
    },

    admin: {
      icon: ShieldCheck,
      className: "bg-purple-100 text-purple-600",
    },
  };

  const config = roleConfig[user?.role] || roleConfig.student;

  const RoleIcon = config.icon;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${config.className}`}
        title={user?.role || "User"}
      >
        <RoleIcon size={21} strokeWidth={2} />
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
