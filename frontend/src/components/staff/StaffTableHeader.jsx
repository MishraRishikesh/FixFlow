// ===============================
// 1. Component
// ===============================

function StaffTableHeader() {
  return (
    <thead className="bg-slate-50">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}

export default StaffTableHeader;
