import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarCheck } from 'lucide-react';
import Toast from '../components/Toast';

export default function FormBooking() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { status: "PENDING" }
  });
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Could not create booking');

      setToast({ type: "success", message: "Booking created successfully in H2!" });
      reset();
    } catch (err) {
      setToast({ type: "error", message: "Failed to connect to backend server (Port 8080)" });
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 px-4">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      
      <div className="relative rounded-2xl bg-[#0B1329]/90 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-xl overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-emerald-400 before:to-transparent">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-100 tracking-wide">Create Booking</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                User Email
              </label>
              <input
                type="email"
                {...register("userEmail", { required: "Email is required" })}
                className="w-full bg-[#070D1B] border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="user@example.com"
              />
              {errors.userEmail && <p className="text-xs text-red-400 mt-1">{errors.userEmail.message}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Facility Name
              </label>
              <input
                type="text"
                {...register("facilityName", { required: "Facility name is required" })}
                className="w-full bg-[#070D1B] border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="e.g. Auditorium A"
              />
              {errors.facilityName && <p className="text-xs text-red-400 mt-1">{errors.facilityName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Start Date / Time
              </label>
              <input
                type="datetime-local"
                {...register("startAt", { required: "Required" })}
                className="w-full bg-[#070D1B] border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
              />
              {errors.startAt && <p className="text-xs text-red-400 mt-1">{errors.startAt.message}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                End Date / Time
              </label>
              <input
                type="datetime-local"
                {...register("endAt", { required: "Required" })}
                className="w-full bg-[#070D1B] border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
              />
              {errors.endAt && <p className="text-xs text-red-400 mt-1">{errors.endAt.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full bg-[#070D1B] border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer"
            >
              <option value="PENDING" className="bg-[#0B1329]">PENDING</option>
              <option value="CONFIRMED" className="bg-[#0B1329]">CONFIRMED</option>
              <option value="CANCELLED" className="bg-[#0B1329]">CANCELLED</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Notes
            </label>
            <input
              type="text"
              {...register("notes")}
              className="w-full bg-[#070D1B] border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="e.g. Needs HDMI adapter and extra chairs"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-[0.99] cursor-pointer"
          >
            Save Booking
          </button>
        </form>
      </div>
    </div>
  );
}