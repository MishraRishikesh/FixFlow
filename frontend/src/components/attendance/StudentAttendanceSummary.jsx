import { CalendarCheck, CalendarX, Clock3, Percent } from "lucide-react";

function StudentAttendanceSummary({ summary = {} }) {
  const { present = 0, absent = 0, onLeave = 0, percentage = 0 } = summary;

  const cards = [
    {
      title: "Attendance",
      value: `${percentage}%`,
      icon: Percent,
      className: "text-blue-600 bg-blue-100",
    },
    {
      title: "Present",
      value: present,
      icon: CalendarCheck,
      className: "text-green-600 bg-green-100",
    },
    {
      title: "Absent",
      value: absent,
      icon: CalendarX,
      className: "text-red-600 bg-red-100",
    },
    {
      title: "On Leave",
      value: onLeave,
      icon: Clock3,
      className: "text-yellow-600 bg-yellow-100",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(card => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>

                <p className="mt-2 text-2xl font-bold">{card.value}</p>
              </div>

              <div className={`rounded-lg p-3 ${card.className}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StudentAttendanceSummary;
