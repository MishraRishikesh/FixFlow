function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <h3 className="text-5xl font-extrabold text-blue-600">{value}</h3>

      <p className="mt-4 text-lg font-medium text-slate-600">{label}</p>
    </div>
  );
}

export default StatCard;
