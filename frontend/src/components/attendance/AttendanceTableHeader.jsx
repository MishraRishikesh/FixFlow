function AttendanceTableHeader() {
  return (
    <thead className="bg-slate-50">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">
          Enrollment No.
        </th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Marked By</th>

        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}

export default AttendanceTableHeader;
