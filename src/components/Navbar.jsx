import { Building2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white py-4 px-6 shadow-md mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 className="text-blue-400 w-6 h-6" />
          <h1 className="text-lg font-bold">Space & Booking Management System</h1>
        </div>
        <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
          Integrative Project
        </span>
      </div>
    </nav>
  );
}