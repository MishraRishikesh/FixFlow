// ===============================
// 1. Imports
// ===============================

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import CreateStaffModal from "./CreateStaffModal";
import StaffForm from "./StaffForm";

// ===============================
// 2. Component
// ===============================

function StaffToolbar({ refreshStaff, searchTerm, setSearchTerm }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}

        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search workers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Add Worker */}

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Worker
        </button>
      </div>

      <CreateStaffModal open={open} onClose={() => setOpen(false)}>
        <StaffForm
          mode="create"
          onSuccess={() => {
            setOpen(false);
            refreshStaff?.();
          }}
        />
      </CreateStaffModal>
    </>
  );
}

export default StaffToolbar;
