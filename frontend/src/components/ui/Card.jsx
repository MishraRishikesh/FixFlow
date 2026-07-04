function Card({ children, className = "", padding = "md", shadow = "md" }) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
  };

  return (
    <div
      className={`
       w-full
     bg-white
        border
        border-slate-200
        rounded-xl
        ${paddingClasses[padding] || paddingClasses.md}
        ${shadowClasses[shadow] || shadowClasses.md}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
