import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarCheck } from "lucide-react";
import Toast from "../components/Toast";
import { cyberAccentClass, cyberFieldClass } from "../utils/formClasses";
import { getSubmitErrorMessage, postData } from "../utils/apiHelper";

export default function FormBooking() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { status: "PENDING" },
  });
  const [toast, setToast] = useState(null);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data) => {
    try {
      await postData("bookings", data);

      setToast({
        type: "success",
        message: "Booking created successfully in H2!",
      });
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
          <div className={cyberAccentClass(hasErrors, "emerald")} />

          <div className="cyber-header">
            <div className="cyber-icon-box cyber-icon-box-emerald">
              <CalendarCheck className="cyber-icon-emerald" />
            </div>
            <h2 className="cyber-title">Create Booking</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="cyber-form">
            <div className="cyber-grid-2">
              <div>
                <label className="cyber-label">User Email</label>
                <input
                  type="email"
                  {...register("userEmail", { required: "Email is required" })}
                  className={cyberFieldClass(errors, "userEmail")}
                  placeholder="user@example.com"
                />
                {errors.userEmail && (
                  <p className="cyber-error">⚠ {errors.userEmail.message}</p>
                )}
              </div>

              <div>
                <label className="cyber-label">Facility Name</label>
                <input
                  type="text"
                  {...register("facilityName", {
                    required: "Facility name is required",
                  })}
                  className={cyberFieldClass(errors, "facilityName")}
                  placeholder="e.g. Auditorium A"
                />
                {errors.facilityName && (
                  <p className="cyber-error">⚠ {errors.facilityName.message}</p>
                )}
              </div>
            </div>

            <div className="cyber-grid-2">
              <div>
                <label className="cyber-label">Start Date / Time</label>
                <input
                  type="datetime-local"
                  {...register("startAt", { required: "Required" })}
                  className={`${cyberFieldClass(errors, "startAt")} cyber-input-datetime`}
                />
                {errors.startAt && (
                  <p className="cyber-error">⚠ {errors.startAt.message}</p>
                )}
              </div>

              <div>
                <label className="cyber-label">End Date / Time</label>
                <input
                  type="datetime-local"
                  {...register("endAt", { required: "Required" })}
                  className={`${cyberFieldClass(errors, "endAt")} cyber-input-datetime`}
                />
                {errors.endAt && (
                  <p className="cyber-error">⚠ {errors.endAt.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="cyber-label">Status</label>
              <select
                {...register("status")}
                className={`${cyberFieldClass(errors, "status")} cursor-pointer`}
              >
                <option value="PENDING" className="bg-[#0B1329]">
                  PENDING
                </option>
                <option value="CONFIRMED" className="bg-[#0B1329]">
                  CONFIRMED
                </option>
                <option value="CANCELLED" className="bg-[#0B1329]">
                  CANCELLED
                </option>
              </select>
            </div>

            <div>
              <label className="cyber-label">Notes</label>
              <input
                type="text"
                {...register("notes")}
                className={cyberFieldClass(errors, "notes")}
                placeholder="e.g. Needs HDMI adapter and extra chairs"
              />
            </div>

            <button type="submit" className="cyber-submit-emerald">
              Save Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
