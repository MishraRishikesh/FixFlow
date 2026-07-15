// ===============================
// 1. Styles
// ===============================

const priorityStyles = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

// ===============================
// 2. Component
// ===============================

function PriorityBadge({ priority }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        priorityStyles[priority] || "bg-gray-100 text-gray-700"
      }`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

export default PriorityBadge;
