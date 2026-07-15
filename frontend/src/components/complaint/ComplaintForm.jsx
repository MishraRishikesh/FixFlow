import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  createComplaint,
  updateComplaint,
} from "../../services/complaintService";

function ComplaintForm({ onSuccess, complaint = null, mode = "create" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: complaint
      ? {
          title: complaint.title,
          description: complaint.description,
          category: complaint.category,
          priority: complaint.priority,
        }
      : {
          title: "",
          description: "",
          category: "",
          priority: "medium",
        },
  });

  const onSubmit = async data => {
    try {
      const response =
        mode === "create"
          ? await createComplaint(data)
          : await updateComplaint(complaint._id, data);

      toast.success(response.message);

      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1 block font-medium">Title</label>

        <input
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Category</label>

        <select
          {...register("category", {
            required: true,
          })}
          className="w-full rounded-lg border p-3"
        >
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="furniture">Furniture</option>
          <option value="cleaning">Cleaning</option>
          <option value="internet">Internet</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Priority</label>

        <select
          {...register("priority")}
          className="w-full rounded-lg border p-3"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Description</label>

        <textarea
          rows={5}
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? mode === "create"
            ? "Submitting..."
            : "Saving..."
          : mode === "create"
            ? "Submit Complaint"
            : "Save Changes"}
      </button>
    </form>
  );
}

export default ComplaintForm;
