import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";

import CreateHostelModal from "./CreateHostelModal";
import HostelForm from "./HostelForm";

function HostelToolbar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isAdmin,
}) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  async function handleCreateSuccess() {
    setOpen(false);

    await queryClient.invalidateQueries({
      queryKey: ["hostels"],
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search hostels..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="all">All</option>
          </select>
        </div>

        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Hostel
          </button>
        )}
      </div>

      {isAdmin && (
        <CreateHostelModal open={open} onClose={() => setOpen(false)}>
          <HostelForm mode="create" onSuccess={handleCreateSuccess} />
        </CreateHostelModal>
      )}
    </>
  );
}

export default HostelToolbar;
