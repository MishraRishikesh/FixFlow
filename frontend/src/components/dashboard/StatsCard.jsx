import Card from "../ui/Card";

const colorVariants = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    border: "border-blue-500/20",
  },
  orange: {
    icon: "bg-orange-100 text-orange-500",
    border: "border-orange-500/20",
  },
  green: {
    icon: "bg-green-100 text-green-600",
    border: "border-green-500/20",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    border: "border-purple-500/20",
  },
};

function StatsCard({ title, value, icon: Icon, color = "blue" }) {
  const variant = colorVariants[color] ?? colorVariants.blue;

  return (
    <Card
      className={`
        border
        ${variant.border}
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        <div
          className={`
            rounded-xl
            p-3
            ${variant.icon}
          `}
        >
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </Card>
  );
}

export default StatsCard;
