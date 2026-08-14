import { Link } from "react-router-dom";
import { Plus, ClipboardList, Users, Wrench } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import useAuth from "../../hooks/useAuth";

function QuickActions() {
  const { user } = useAuth();

  const actions = {
    student: [
      {
        label: "Raise Complaint",
        icon: Plus,
        to: "/complaints",
      },
      {
        label: "My Complaints",
        icon: ClipboardList,
        to: "/complaints",
      },
    ],

    worker: [
      {
        label: "Assigned Complaints",
        icon: ClipboardList,
        to: "/complaints",
      },
      {
        label: "Update Status",
        icon: Wrench,
        to: "/complaints",
      },
    ],

    warden: [
      {
        label: "Manage Workers",
        icon: Users,
        to: "/staff",
      },
      {
        label: "View Complaints",
        icon: ClipboardList,
        to: "/complaints",
      },
      {
        label: "Add Worker",
        icon: Plus,
        to: "/staff",
      },
    ],
  };

  const roleActions = actions[user?.role] ?? [];

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Quick Actions</h2>

      <div className="space-y-3">
        {roleActions.map(action => {
          const Icon = action.icon;

          return (
            <Link key={action.label} to={action.to}>
              <Button className="w-full justify-start gap-2">
                <Icon size={18} />
                {action.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickActions;
