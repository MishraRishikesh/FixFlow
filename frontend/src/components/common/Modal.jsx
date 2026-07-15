// ===============================
// 1. Imports
// ===============================

import { X } from "lucide-react";

// ===============================
// 2. Component
// ===============================

function Modal({ open, title, onClose, children, maxWidth = "max-w-2xl" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full ${maxWidth} rounded-xl bg-white shadow-xl`}>
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
