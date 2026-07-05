import clsx from "clsx";

function Badge({ children, className = "" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full",
        "bg-blue-100 text-blue-700",
        "px-4 py-1 text-sm font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
