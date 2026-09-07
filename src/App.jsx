import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import FormFacility from "./forms/FormFacility";
import FormBooking from "./forms/FormBooking";
import FormUser from "./forms/FormUser";
import FormAnnouncement from "./forms/FormAnnouncement";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-12 overflow-x-hidden selection:bg-cyan-500/30">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="relative max-w-3xl mx-auto px-4 mt-8 z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<FormUser />} />
          <Route path="/announcements" element={<FormAnnouncement />} />
          <Route path="/facilities" element={<FormFacility />} />
          <Route path="/bookings" element={<FormBooking />} />
        </Routes>
      </main>
    </div>
  );
}
