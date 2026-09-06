import { useForm } from 'react-hook-form';
import { Megaphone } from 'lucide-react';

export default function FormAnnouncement() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("✅ [Announcement] Model captured:", data);
    alert("Announcement saved successfully.");
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-dashed border-amber-300 bg-amber-50/20">
      <div className="flex items-center gap-2 mb-4 text-amber-600">
        <Megaphone className="w-5 h-5" />
        <h2 className="font-bold text-slate-800">Create Announcement (Scaffold)</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Announcement Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
            placeholder="Main Title"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* TODO TEAM MATE: Add Announcement fields (Content, Publish Date, etc.) here */}

        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-md text-sm transition">
          Save Announcement
        </button>
      </form>
    </div>
  );
}