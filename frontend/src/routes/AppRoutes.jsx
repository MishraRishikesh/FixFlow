import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ComplaintsPage from "../pages/complaints/ComplaintsPage";
import StaffPage from "../pages/staff/StaffPage";
import HostelPage from "../pages/hostel/HostelPage";
import StudentPage from "../pages/student/StudentPage";
import AttendancePage from "../pages/attendance/AttendancePage";
import FeesPage from "../pages/fees/FeesPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import useAuth from "../hooks/useAuth";

function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* Protected */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* All authenticated roles */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Warden + Worker + Student */}
          <Route
            path="/complaints"
            element={
              <RoleRoute allowedRoles={["warden", "worker", "student"]}>
                <ComplaintsPage />
              </RoleRoute>
            }
          />

          {/* Warden only */}
          <Route
            path="/staff"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <StaffPage />
              </RoleRoute>
            }
          />

          {/* Admin + Warden */}
          <Route
            path="/hostel"
            element={
              <RoleRoute allowedRoles={["admin", "warden"]}>
                <HostelPage />
              </RoleRoute>
            }
          />

          {/* Warden only */}
          <Route
            path="/students"
            element={
              <RoleRoute allowedRoles={["warden"]}>
                <StudentPage />
              </RoleRoute>
            }
          />

          {/* Warden + Student */}
          <Route
            path="/attendance"
            element={
              <RoleRoute allowedRoles={["warden", "student"]}>
                <AttendancePage />
              </RoleRoute>
            }
          />

          {/* Warden + Student */}
          <Route
            path="/fees"
            element={
              <RoleRoute allowedRoles={["warden", "student"]}>
                <FeesPage />
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
