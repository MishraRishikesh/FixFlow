// ===============================
// 1. Imports
// ===============================

import { Inbox } from "lucide-react";

// ===============================
// 2. Component
// ===============================

function EmptyState({
  title = "Nothing Found",
  description = "There's nothing to display.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
      <Inbox size={56} className="mb-4 text-gray-400" />

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 max-w-sm text-gray-500">{description}</p>
    </div>
  );
}

export default EmptyState;
