import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building } from 'lucide-react';
import { postData } from '../utils/apiHelper';
import Toast from '../components/Toast';

export default function FormFacility() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { active: "true" }
  });
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      capacity: parseInt(data.capacity, 10),
      active: data.active === "true"
    };

    try {
      await postData('/facilities', payload);
      setToast({ type: "success", message: "Facility registered successfully in H2!" });
      reset();
    } catch (err) {
      setToast({ type: "error", message: "Failed to connect to backend server (Port 8080)" });
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 px-4">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      
      <div className="cyber-card">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Building className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-100 tracking-wide">Register Facility</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="cyber-label">Facility Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="cyber-input"
              placeholder="Auditorium A"
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="cyber-label">Description</label>
            <input
              type="text"
              {...register("description", { required: "Description is required" })}
              className="cyber-input"
              placeholder="Main event hall with 4K projector"
            />
            {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="cyber-label">Capacity</label>
              <input
                type="number"
                {...register("capacity", { required: "Required", min: 1 })}
                className="cyber-input"
                placeholder="50"
              />
              {errors.capacity && <p className="text-xs text-red-400 mt-1">{errors.capacity.message}</p>}
            </div>

            <div>
              <label className="cyber-label">Location</label>
              <input
                type="text"
                {...register("location", { required: "Required" })}
                className="cyber-input"
                placeholder="Building 1 - Floor 2"
              />
              {errors.location && <p className="text-xs text-red-400 mt-1">{errors.location.message}</p>}
            </div>
          </div>

          <div>
            <label className="cyber-label">Status</label>
            <select {...register("active")} className="cyber-input cursor-pointer">
              <option value="true" className="bg-[#0B1329]">Active</option>
              <option value="false" className="bg-[#0B1329]">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
          >
            Save Facility
          </button>
        </form>
      </div>
    </div>
  );
}