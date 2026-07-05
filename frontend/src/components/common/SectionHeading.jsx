function SectionHeading({ title, subtitle, align = "center" }) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2
        className={`font-bold text-slate-900 ${
          align === "center" ? "text-4xl" : "text-3xl"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-lg text-slate-600 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
