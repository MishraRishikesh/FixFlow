import Modal from "../common/Modal";

function DeleteHostelModal({ open, onClose, hostel, onDeactivate }) {
  if (!hostel) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title="Deactivate Hostel">
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to deactivate
          <span className="font-semibold"> {hostel.name}</span>?
        </p>

        <p className="text-sm text-gray-500">
          The hostel will no longer appear in the active hostel list, but its
          data will be preserved.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDeactivate}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Deactivate
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteHostelModal;
