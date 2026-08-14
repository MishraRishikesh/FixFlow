import { useState } from "react";
import toast from "react-hot-toast";

import { createHostel, updateHostel } from "../../services/hostelService";

function HostelForm({ mode = "create", hostel = null, onSuccess }) {
  const [formData, setFormData] = useState(() => ({
    name: hostel?.name || "",
    code: hostel?.code || "",
    capacity: hostel?.capacity || "",
  }));

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Hostel name is required.");
      return;
    }

    if (!formData.code.trim()) {
      toast.error("Hostel code is required.");
      return;
    }

    if (!formData.capacity || Number(formData.capacity) < 1) {
      toast.error("Capacity must be at least 1.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        capacity: Number(formData.capacity),
      };

      const response =
        mode === "edit"
          ? await updateHostel(hostel._id, data)
          : await createHostel(data);

      toast.success(
        response.message ||
          `Hostel ${mode === "edit" ? "updated" : "created"} successfully.`,
      );

      onSuccess?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${mode === "edit" ? "update" : "create"} hostel.`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Hostel Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Boys Hostel A"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="code"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Hostel Code
        </label>

        <input
          id="code"
          name="code"
          type="text"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g. BH-A"
          className="w-full rounded-lg border px-3 py-2 uppercase focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="capacity"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Capacity
        </label>

        <input
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="e.g. 200"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "edit"
              ? "Update Hostel"
              : "Create Hostel"}
        </button>
      </div>
    </form>
  );
}

export default HostelForm;
