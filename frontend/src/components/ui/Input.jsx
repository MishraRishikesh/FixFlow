function Input({ label, error, fullWidth = false, className = "", ...props }) {
  const inputClasses = `
    border
    border-slate-300
    rounded-lg
    px-4
    py-2
    w-full
    outline-none
    transition-all
    duration-200
    focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2
    focus:border-blue-500
    disabled:bg-slate-100
    disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input className={inputClasses} {...props} />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
