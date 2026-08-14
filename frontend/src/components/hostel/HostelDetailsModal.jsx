import Modal from "../common/Modal";

function HostelDetailsModal({ open, onClose, hostel }) {
  if (!hostel) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title="Hostel Details">
      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">Hostel Name</p>

          <p className="font-medium">{hostel.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Hostel Code</p>

          <p className="font-medium">{hostel.code}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Capacity</p>

          <p className="font-medium">{hostel.capacity}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>

          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
              hostel.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {hostel.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created</p>

          <p className="font-medium">
            {new Date(hostel.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {hostel.createdBy && (
          <div>
            <p className="text-sm text-gray-500">Created By</p>

            <p className="font-medium">{hostel.createdBy.name}</p>

            {hostel.createdBy.email && (
              <p className="text-sm text-gray-500">{hostel.createdBy.email}</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default HostelDetailsModal;
