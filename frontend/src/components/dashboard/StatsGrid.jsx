import { AlertCircle, CheckCircle2, Clock3, Users } from "lucide-react";

import StatsCard from "./StatsCard";

function StatsGrid({ stats = {} }) {
  const cards = [
    {
      title: "Pending Complaints",
      value: stats.pending ?? 0,
      icon: Clock3,
      color: "orange",
    },
    {
      title: "Active Complaints",
      value: (stats.assigned ?? 0) + (stats.inProgress ?? 0),
      icon: AlertCircle,
      color: "blue",
    },
    {
      title: "Resolved Complaints",
      value: stats.completed ?? 0,
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "Workers",
      value: stats.workers ?? 0,
      icon: Users,
      color: "purple",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(card => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export default StatsGrid;
