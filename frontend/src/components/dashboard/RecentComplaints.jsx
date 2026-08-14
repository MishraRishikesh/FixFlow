import { Eye } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const statusVariant = {
  pending: "warning",
  assigned: "info",
  in_progress: "primary",
  completed: "success",
  rejected: "danger",
};

const priorityVariant = {
  low: "secondary",
  medium: "warning",
  high: "danger",
};

function RecentComplaints({ complaints = [] }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Complaints</h2>

        <Link
          to="/complaints"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      {complaints.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No complaints found.
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.slice(0, 5).map(complaint => (
            <div
              key={complaint._id}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-4
                hover:bg-gray-50
                transition
              "
            >
              <div className="space-y-2">
                <h3 className="font-medium">{complaint.title}</h3>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={statusVariant[complaint.status]}>
                    {complaint.status.replace("_", " ")}
                  </Badge>

                  <Badge variant={priorityVariant[complaint.priority]}>
                    {complaint.priority}
                  </Badge>

                  <Badge variant="secondary">{complaint.category}</Badge>
                </div>

                <p className="text-sm text-gray-500">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Button variant="outline" size="sm">
                <Eye size={18} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecentComplaints;
