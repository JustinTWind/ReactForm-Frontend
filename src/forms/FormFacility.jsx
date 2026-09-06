import { useForm } from 'react-hook-form';
import { Building } from 'lucide-react';

export default function FormFacility() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("✅ [Facility] Model captured:", data);
    alert("Facility saved successfully. Check console (F12).");
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <Building className="w-5 h-5" />
        <h2 className="font-bold text-slate-800">Register Facility</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Facility Name</label>
          <input
            type="text"
            {...register("name", { required: "Facility name is required" })}
            className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Conference Room A"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Max Capacity</label>
            <input
              type="number"
              {...register("capacity", { 
                required: "Capacity is required",
                min: { value: 1, message: "Min 1 person" } 
              })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="25"
            />
            {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>}
          </div>

          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Building 3 - Floor 2"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Facility Type</label>
            <select
              {...register("type", { required: "Select a type" })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select Type</option>
              <option value="MEETING_ROOM">Meeting Room</option>
              <option value="AUDITORIUM">Auditorium</option>
              <option value="LABORATORY">Laboratory</option>
              <option value="CLASSROOM">Classroom</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
          </div>

          {}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
            <select
              {...register("status", { required: "Select status" })}
              className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="AVAILABLE">Available</option>
              <option value="MAINTENANCE">In Maintenance</option>
              <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm transition">
          Save Facility
        </button>
      </form>
    </div>
  );
}