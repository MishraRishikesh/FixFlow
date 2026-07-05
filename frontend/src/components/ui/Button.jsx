import clsx from "clsx";
import { colors } from "../../styles/tokens";
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  type = "button",
  onClick,
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const variantClasses = {
    primary: clsx(colors.primary.bg, colors.primary.hover, colors.primary.text),

    secondary: clsx(
      colors.secondary.bg,
      colors.secondary.hover,
      colors.secondary.text,
    ),

    danger: clsx(colors.danger.bg, colors.danger.hover, colors.danger.text),

    outline: clsx(
      "border border-slate-300",
      "bg-white",
      "text-slate-700",
      "hover:bg-slate-100",
    ),
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",

    md: "px-4 py-2 text-base",

    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses =
    disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses}
            ${variantClasses[variant] || variantClasses.primary}
            ${sizeClasses[size] || sizeClasses.md}
            ${disabledClasses}
            ${widthClass}`}
    >
      {loading ? "Loading..." : icon}

      {!loading && children}

      {loading && children}
    </button>
  );
}

export default Button;
