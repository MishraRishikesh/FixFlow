import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [status, setStatus] = useState("Checking...");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health");

        setStatus("🟢 Online");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Backend connection failed:", error);

        setStatus("🔴 Offline");
        setMessage("Unable to connect to backend.");
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-blue-600">FixFlow</h1>

      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold">Backend Status</h2>

        <p className="mt-3 text-lg">{status}</p>

        <p className="text-gray-500 mt-2">{message}</p>
      </div>
    </div>
  );
}

export default App;
