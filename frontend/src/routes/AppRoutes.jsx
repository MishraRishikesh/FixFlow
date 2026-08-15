import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ComplaintsPage from "../pages/complaints/ComplaintsPage";
import StaffPage from "../pages/staff/StaffPage";
import HostelPage from "../pages/hostel/HostelPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import StudentPage from "../pages/student/StudentPage";
import AttendancePage from "../pages/attendance/AttendancePage";

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/hostel" element={<HostelPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
