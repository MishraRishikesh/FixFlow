// ===============================
// 1. Imports
// ===============================

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createStaff, updateStaff } from "../../services/staffService";

// ===============================
// 2. Component
// ===============================

function StaffForm({ onSuccess, staff = null, mode = "create" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: staff?.name || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      if (mode === "create") {
        payload.password = data.password;
      }

      const response =
        mode === "create"
          ? await createStaff(payload)
          : await updateStaff(staff._id, payload);

      toast.success(response.message);

      reset();

      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}

      <div>
        <label className="mb-1 block font-medium">Name</label>

        <input
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="mb-1 block font-medium">Email</label>

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}

      <div>
        <label className="mb-1 block font-medium">Phone</label>

        <input
          {...register("phone")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Password */}

      {mode === "create" && (
        <div>
          <label className="mb-1 block font-medium">Password</label>

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-lg border p-3"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting
          ? mode === "create"
            ? "Creating..."
            : "Saving..."
          : mode === "create"
            ? "Create Worker"
            : "Save Changes"}
      </button>
    </form>
  );
}

// ===============================
// 3. Export
// ===============================

export default StaffForm;
