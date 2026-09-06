import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import FormFacility from './forms/FormFacility';
import FormBooking from './forms/FormBooking';
import FormUser from './forms/FormUser';
import FormAnnouncement from './forms/FormAnnouncement';
import { Building, CalendarCheck, Users, Megaphone } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 space-y-8">
        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Facilities" count="12 Total" icon={Building} color="bg-blue-600" />
          <StatCard title="Bookings" count="28 Active" icon={CalendarCheck} color="bg-emerald-600" />
          <StatCard title="Users" count="45 Registered" icon={Users} color="bg-purple-600" />
          <StatCard title="Announcements" count="5 Published" icon={Megaphone} color="bg-amber-600" />
        </div>

        {}
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-3">Primary Entities (Completed)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFacility />
            <FormBooking />
          </div>
        </div>

        {}
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-3">Secondary Entities (Base Scaffolds)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormUser />
            <FormAnnouncement />
          </div>
        </div>
      </main>
    </div>
  );
}