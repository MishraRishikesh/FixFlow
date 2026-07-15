import Card from "../ui/Card";
import StatusBadge from "../common/StatusBadge";

function RecentComplaints({ complaints }) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Recent Complaints</h2>

      <div className="space-y-3">
        {complaints.map(complaint => (
          <div
            key={complaint._id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <p>{complaint.title}</p>

            <StatusBadge status={complaint.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecentComplaints;
