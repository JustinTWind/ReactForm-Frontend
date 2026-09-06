import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';

export default function FormUser() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("✅ [User] Model captured:", data);
    alert("User saved successfully.");
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-dashed border-purple-300 bg-purple-50/20">
      <div className="flex items-center gap-2 mb-4 text-purple-600">
        <User className="w-5 h-5" />
        <h2 className="font-bold text-slate-800">Create User (Scaffold)</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
          <input
            type="text"
            {...register("username", { required: "Full name is required" })}
            className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="John Doe"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md text-sm transition">
          Save User
        </button>
      </form>
    </div>
  );
}