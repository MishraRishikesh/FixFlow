import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import WardenAttendancePage from "./WardenAttendancePage";
import StudentAttendancePage from "./StudentAttendancePage";

function AttendancePage() {
  const { user } = useContext(AuthContext);

  if (user?.role === "student") {
    return <StudentAttendancePage />;
  }

  return <WardenAttendancePage />;
}

export default AttendancePage;
