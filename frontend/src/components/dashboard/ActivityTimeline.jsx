import Card from "../ui/Card";

import { Clock3, CheckCircle2, AlertCircle } from "lucide-react";

function ActivityTimeline({ activities = [] }) {
  const getIcon = status => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="text-green-600" size={18} />;

      case "pending":
        return <AlertCircle className="text-yellow-600" size={18} />;

      default:
        return <Clock3 className="text-blue-600" size={18} />;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">Recent Activity</h2>

      <div className="space-y-5">
        {activities.length === 0 && (
          <p className="text-sm text-gray-500">No recent activity.</p>
        )}

        {activities.map(item => (
          <div key={item._id} className="flex items-start gap-4">
            {getIcon(item.status)}

            <div className="flex-1">
              <p className="font-medium">{item.title}</p>

              <p className="text-sm text-gray-500">{item.status}</p>
            </div>

            <span className="text-xs text-gray-400">
              {new Date(item.updatedAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ActivityTimeline;
