import useAuth from "../../hooks/useAuth";
import StudentFeesPage from "./StudentFeesPage";
import WardenFeesPage from "./WardenFeesPage";

function FeesPage() {
  const { user } = useAuth();

  if (user?.role === "student") {
    return <StudentFeesPage />;
  }

  if (user?.role === "warden" || user?.role === "admin") {
    return <WardenFeesPage />;
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Access Denied</h2>
        <p className="mt-2 text-sm text-slate-500">
          You are not authorized to access fee management.
        </p>
      </div>
    </div>
  );
}

export default FeesPage;
