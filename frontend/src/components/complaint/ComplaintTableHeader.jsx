function ComplaintTableHeader() {
  return (
    <thead className="bg-slate-50">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Priority</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}

export default ComplaintTableHeader;
