import { useForm } from 'react-hook-form';
import { CalendarCheck } from 'lucide-react';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function FormBooking() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [toast, setToast] = useState(null);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data) => {
    console.log("✅ [Booking] Model captured:", data);
    setToast({ type: 'success', message: 'Booking created successfully! 🎉 (Mock)' });
    reset();
  };

  const onError = () => {
    setToast({ type: 'error', message: 'Please fix the highlighted fields before submitting.' });
  };

  const inputClass = (fieldName) =>
    `w-full p-2.5 text-sm rounded-lg outline-none transition-all duration-300
     bg-slate-900/60 text-slate-100 placeholder-slate-500
     border ${errors[fieldName]
      ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)] focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]'
      : 'border-slate-700/50 focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
    }`;

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div
        className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500
          ${hasErrors
            ? 'bg-red-950/20 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
            : 'bg-slate-800/40 border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)]'
          }
        `}
      >
        <div
          className={`absolute top-0 left-4 right-4 h-[2px] rounded-full transition-colors duration-500
            ${hasErrors
              ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent'
              : 'bg-gradient-to-r from-transparent via-emerald-500 to-transparent'
            }
          `}
          style={{
            boxShadow: hasErrors
              ? '0 0 12px rgba(239, 68, 68, 0.6)'
              : '0 0 12px rgba(16, 185, 129, 0.6)',
          }}
        />

        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
            <CalendarCheck className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          </div>
          <h2 className="font-bold text-lg text-slate-100 tracking-wide">Create Booking</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-emerald-300/80 mb-1.5 uppercase tracking-wider">User Email</label>
              <input
                type="email"
                {...register("userEmail", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                })}
                className={inputClass('userEmail')}
                placeholder="user@domain.com"
              />
              {errors.userEmail && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.userEmail.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/80 mb-1.5 uppercase tracking-wider">Facility Name</label>
              <input
                type="text"
                {...register("facilityName", { required: "Facility name is required" })}
                className={inputClass('facilityName')}
                placeholder="e.g. Room A"
              />
              {errors.facilityName && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.facilityName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-emerald-300/80 mb-1.5 uppercase tracking-wider">Date</label>
              <input
                type="date"
                {...register("bookingDate", { required: "Required" })}
                className={inputClass('bookingDate')}
              />
              {errors.bookingDate && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.bookingDate.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/80 mb-1.5 uppercase tracking-wider">Start Time</label>
              <input
                type="time"
                {...register("bookingTime", { required: "Required" })}
                className={inputClass('bookingTime')}
              />
              {errors.bookingTime && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.bookingTime.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/80 mb-1.5 uppercase tracking-wider">Hours</label>
              <input
                type="number"
                {...register("duration", { 
                  required: "Required",
                  min: { value: 1, message: "Min 1 hr" },
                  max: { value: 12, message: "Max 12 hrs" }
                })}
                className={inputClass('duration')}
                placeholder="2"
              />
              {errors.duration && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.duration.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-300/80 mb-1.5 uppercase tracking-wider">Booking Purpose</label>
            <input
              type="text"
              {...register("purpose", { required: "Please specify the purpose" })}
              className={inputClass('purpose')}
              placeholder="e.g. Weekly team meeting"
            />
            {errors.purpose && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.purpose.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300
              bg-gradient-to-r from-emerald-600 to-teal-600
              hover:from-emerald-500 hover:to-teal-500
              hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
              active:scale-[0.98] cursor-pointer
            "
            style={{ boxShadow: '0 0 15px rgba(16, 185, 129, 0.25)' }}
          >
            Save Booking
          </button>
        </form>
      </div>
    </>
  );
}