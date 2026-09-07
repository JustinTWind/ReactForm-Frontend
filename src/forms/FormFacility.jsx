import { useForm } from 'react-hook-form';
import { Building } from 'lucide-react';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function FormFacility() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [toast, setToast] = useState(null);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data) => {
    console.log("✅ [Facility] Model captured:", data);
    setToast({ type: 'success', message: 'Facility saved successfully! 🎉 (Mock)' });
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
      : 'border-slate-700/50 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    }`;

  const selectClass = (fieldName) =>
    `w-full p-2.5 text-sm rounded-lg outline-none transition-all duration-300
     bg-slate-900/60 text-slate-100
     border ${errors[fieldName]
      ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)] focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]'
      : 'border-slate-700/50 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    }`;

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div
        className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500
          ${hasErrors
            ? 'bg-red-950/20 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
            : 'bg-slate-800/40 border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.08)]'
          }
        `}
      >
        <div
          className={`absolute top-0 left-4 right-4 h-[2px] rounded-full transition-colors duration-500
            ${hasErrors
              ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
            }
          `}
          style={{
            boxShadow: hasErrors
              ? '0 0 12px rgba(239, 68, 68, 0.6)'
              : '0 0 12px rgba(59, 130, 246, 0.6)',
          }}
        />

        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30">
            <Building className="w-5 h-5 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
          </div>
          <h2 className="font-bold text-lg text-slate-100 tracking-wide">Register Facility</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-blue-300/80 mb-1.5 uppercase tracking-wider">Facility Name</label>
            <input
              type="text"
              {...register("name", { required: "Facility name is required" })}
              className={inputClass('name')}
              placeholder="e.g. Conference Room A"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-blue-300/80 mb-1.5 uppercase tracking-wider">Max Capacity</label>
              <input
                type="number"
                {...register("capacity", { 
                  required: "Capacity is required",
                  min: { value: 1, message: "Min 1 person" } 
                })}
                className={inputClass('capacity')}
                placeholder="25"
              />
              {errors.capacity && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.capacity.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-300/80 mb-1.5 uppercase tracking-wider">Location</label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className={inputClass('location')}
                placeholder="Building 3 - Floor 2"
              />
              {errors.location && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-blue-300/80 mb-1.5 uppercase tracking-wider">Facility Type</label>
              <select
                {...register("type", { required: "Select a type" })}
                className={selectClass('type')}
              >
                <option value="">Select Type</option>
                <option value="MEETING_ROOM">Meeting Room</option>
                <option value="AUDITORIUM">Auditorium</option>
                <option value="LABORATORY">Laboratory</option>
                <option value="CLASSROOM">Classroom</option>
              </select>
              {errors.type && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.type.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-300/80 mb-1.5 uppercase tracking-wider">Status</label>
              <select
                {...register("status", { required: "Select status" })}
                className={selectClass('status')}
              >
                <option value="AVAILABLE">Available</option>
                <option value="MAINTENANCE">In Maintenance</option>
                <option value="OUT_OF_SERVICE">Out of Service</option>
              </select>
              {errors.status && <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">⚠ {errors.status.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300
              bg-gradient-to-r from-blue-600 to-cyan-600
              hover:from-blue-500 hover:to-cyan-500
              hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
              active:scale-[0.98] cursor-pointer
            "
            style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.25)' }}
          >
            Save Facility
          </button>
        </form>
      </div>
    </>
  );
}