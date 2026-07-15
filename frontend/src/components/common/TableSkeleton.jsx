// ===============================
// 1. Component
// ===============================

function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-t animate-pulse">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <td key={columnIndex} className="px-6 py-4">
              <div className="h-4 w-full rounded bg-slate-200"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableSkeleton;
