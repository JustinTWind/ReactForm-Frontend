import { useForm } from 'react-hook-form';
import { CalendarCheck } from 'lucide-react';

export default function FormBooking() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("✅ [Booking] Model captured:", data);
    alert("Booking created successfully. Check console (F12).");
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-emerald-600">
        <CalendarCheck className="w-5 h-5" />
        <h2 className="font-bold text-slate-800">Create Booking</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">User Email</label>
            <input
              type="email"
              {...register("userEmail", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="user@domain.com"
            />
            {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail.message}</p>}
          </div>

          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Facility Name</label>
            <input
              type="text"
              {...register("facilityName", { required: "Facility name is required" })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. Room A"
            />
            {errors.facilityName && <p className="text-red-500 text-xs mt-1">{errors.facilityName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
            <input
              type="date"
              {...register("bookingDate", { required: "Required" })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            {errors.bookingDate && <p className="text-red-500 text-xs mt-1">{errors.bookingDate.message}</p>}
          </div>

          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Start Time</label>
            <input
              type="time"
              {...register("bookingTime", { required: "Required" })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            {errors.bookingTime && <p className="text-red-500 text-xs mt-1">{errors.bookingTime.message}</p>}
          </div>

          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Hours</label>
            <input
              type="number"
              {...register("duration", { 
                required: "Required",
                min: { value: 1, message: "Min 1 hr" },
                max: { value: 12, message: "Max 12 hrs" }
              })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="2"
            />
            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
          </div>
        </div>

        {}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Booking Purpose</label>
          <input
            type="text"
            {...register("purpose", { required: "Please specify the purpose" })}
            className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g. Weekly team meeting"
          />
          {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md text-sm transition">
          Save Booking
        </button>
      </form>
    </div>
  );
}