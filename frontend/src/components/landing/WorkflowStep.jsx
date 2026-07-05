function WorkflowStep({ icon, title, description, isLast = false }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl shadow-md">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-3 max-w-[220px] leading-7 text-slate-600">
        {description}
      </p>

      {!isLast && (
        <div
          className="
            hidden
            lg:block
            absolute
            top-10
            left-[calc(100%+12px)]
            w-24
            border-t-2
            border-dashed
            border-blue-300
          "
        />
      )}
    </div>
  );
}

export default WorkflowStep;
