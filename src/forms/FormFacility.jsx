import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {postData} from '../utils/apiHelper';
import Toast from '../components/Toast';

export default function FormFacility() {
  const { register, handleSubmit, reset } = useForm();
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    try {
      await postData('/facilities',{ ...data, capacity: parseInt(data.capacity, 10) });
      setToast({ type: "success", message: "Facility created successfully!" });
      reset();
    } catch (err) {
      setToast({ type: "error", message: "Failed to connect to backend server" });
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 px-4" >
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="cyber-card">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className ="cyber-label">Facility Name</label>
          <input type="text" {...register("name")} className="cyber-input" placeholder="Auditorium"/>
        </div>
      <button type="submit" className="w-full py-3 bg-cyan-600 text-white font-semibold rounded-xl">Save</button>
      </form>
    </div>
    </div>
  );
}