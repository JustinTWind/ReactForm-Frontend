import { useState } from "react";
import { useForm } from "react-hook-form";
import { Building } from "lucide-react";
import { postData, getSubmitErrorMessage } from "../utils/apiHelper";
import Toast from "../components/Toast";
import { cyberAccentClass, cyberFieldClass } from "../utils/formClasses";

export default function FormFacility() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [toast, setToast] = useState(null);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data) => {
    try {
      await postData("facilities", {
        ...data,
        capacity: parseInt(data.capacity, 10),
      });
      setToast({ type: "success", message: "Facility created successfully!" });
      reset();
    } catch (err) {
      console.error("Submission error:", err);
      setToast({ type: "error", message: getSubmitErrorMessage(err) });
    }
  };

  const onError = () => {
    setToast({
      type: "error",
      message: "Please fix the highlighted fields before submitting.",
    });
  };

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="cyber-page">
        <div className={`cyber-card ${hasErrors ? "cyber-card-error" : ""}`}>
          <div className={cyberAccentClass(hasErrors, "cyan")} />

          <div className="cyber-header">
            <div className="cyber-icon-box cyber-icon-box-cyan">
              <Building className="cyber-icon-cyan" />
            </div>
            <h2 className="cyber-title">Register Facility</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="cyber-form">
            <div>
              <label className="cyber-label">Facility Name</label>
              <input
                type="text"
                {...register("name", { required: "Facility name is required" })}
                className={cyberFieldClass(errors, "name")}
                placeholder="Auditorium"
              />
              {errors.name && (
                <p className="cyber-error">⚠ {errors.name.message}</p>
              )}
            </div>

            <button type="submit" className="cyber-submit">
              Save Facility
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
