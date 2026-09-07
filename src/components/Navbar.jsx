import {
  Building2,
  Users,
  Megaphone,
  Building,
  CalendarCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const getNavClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold tracking-wider transition-all duration-300 ${
      isActive
        ? "bg-cyan-500/10 text-cyan-300 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] border border-cyan-500/30"
        : "text-slate-400 hover:text-cyan-200 hover:bg-slate-800/50 border border-transparent"
    }`;

  return (
    <nav className="relative bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/30 text-white py-4 px-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-8">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-40"></div>
            <Building2 className="relative text-cyan-300 w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] hidden sm:block">
            Space & Booking System
          </h1>
        </div>

        {/* Navegaçao 🦧 */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <NavLink to="/users" className={getNavClass}>
            <Users className="w-4 h-4" />
            Users
          </NavLink>
          <NavLink to="/announcements" className={getNavClass}>
            <Megaphone className="w-4 h-4" />
            Announcements
          </NavLink>
          <NavLink to="/facilities" className={getNavClass}>
            <Building className="w-4 h-4" />
            Facilities
          </NavLink>
          <NavLink to="/bookings" className={getNavClass}>
            <CalendarCheck className="w-4 h-4" />
            Bookings
          </NavLink>
        </div>

        <span className="text-xs font-semibold tracking-widest uppercase bg-cyan-950/50 text-cyan-300 px-4 py-1.5 rounded-full border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-sm hidden xl:block">
          Integrative Project
        </span>
      </div>
    </nav>
  );
}
