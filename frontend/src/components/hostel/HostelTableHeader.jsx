function HostelTableHeader() {
  return (
    <thead className="bg-slate-50">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Capacity</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}

export default HostelTableHeader;
