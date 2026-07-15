// ===============================
// 1. Component
// ===============================

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-orange-100 text-orange-600",
    assigned: "bg-purple-100 text-purple-700",
    in_progress: "bg-blue-100 text-blue-600",
    resolved: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
  };

  const label = status
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
