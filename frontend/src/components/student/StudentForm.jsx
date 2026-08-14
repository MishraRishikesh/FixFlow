import { useState } from "react";
import toast from "react-hot-toast";

import { createStudent, updateStudent } from "../../services/studentService";

function StudentForm({ mode = "create", student = null, onSuccess }) {
  const [formData, setFormData] = useState(() => ({
    name: student?.name || "",
    enrollmentNumber: student?.enrollmentNumber || "",
    email: student?.email || "",
    password: "",
    phone: student?.phone || "",
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
      toast.error("Student name is required.");
      return;
    }

    if (!formData.enrollmentNumber.trim()) {
      toast.error("Enrollment number is required.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (mode === "create" && !formData.password) {
      toast.error("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name: formData.name.trim(),
        enrollmentNumber: formData.enrollmentNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
      };

      if (mode === "create") {
        data.password = formData.password;
      }

      const response =
        mode === "edit"
          ? await updateStudent(student._id, data)
          : await createStudent(data);

      toast.success(
        response.message ||
          `Student ${mode === "edit" ? "updated" : "created"} successfully.`,
      );

      onSuccess?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${mode === "edit" ? "update" : "create"} student.`,
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
          Student Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="enrollmentNumber"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Enrollment Number
        </label>

        <input
          id="enrollmentNumber"
          name="enrollmentNumber"
          type="text"
          value={formData.enrollmentNumber}
          onChange={handleChange}
          placeholder="e.g. 0101CS221234"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="student@example.com"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
      </div>

      {mode === "create" && (
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter initial password"
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
            disabled={loading}
          />
        </div>
      )}

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
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
              ? "Update Student"
              : "Create Student"}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
