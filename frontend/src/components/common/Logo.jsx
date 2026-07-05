function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
        F
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-900">FixFlow</h1>

        <p className="text-xs text-slate-500">
          Simplifying Hostel Maintenance.
        </p>
      </div>
    </div>
  );
}

export default Logo;
