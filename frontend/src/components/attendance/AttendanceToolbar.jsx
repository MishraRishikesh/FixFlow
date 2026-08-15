import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";

import Modal from "../common/Modal";
import AttendanceForm from "./AttendanceForm";

function AttendanceToolbar({
  selectedDate,
  setSelectedDate,
  searchTerm,
  setSearchTerm,
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  async function handleSuccess() {
    setOpen(false);

    await queryClient.invalidateQueries({
      queryKey: ["attendance"],
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={event => setSelectedDate(event.target.value)}
            className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Mark Attendance
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Mark Attendance">
        <AttendanceForm selectedDate={selectedDate} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

export default AttendanceToolbar;
