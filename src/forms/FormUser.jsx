import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Loader2 } from "lucide-react";
import Toast from "../components/Toast";
import { cyberAccentClass, cyberFieldClass } from "../utils/formClasses";
import { getSubmitErrorMessage, postData } from "../utils/apiHelper";

export default function FormUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data) => {
    setLoading(true);
    setToast(null);
    try {
      await postData("users", {
        username: data.username,
        email: data.email,
        hashedPassword: data.hashedPassword,
        fullName: data.fullName,
        role: data.role,
        active: true,
      });

      setToast({ type: "success", message: "User created successfully! 🎉" });
      reset();
    } catch (err) {
      console.error("Submission error:", err);
      setToast({ type: "error", message: getSubmitErrorMessage(err) });
    } finally {
      setLoading(false);
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
          <div className={cyberAccentClass(hasErrors, "purple")} />

          <div className="cyber-header">
            <div className="cyber-icon-box cyber-icon-box-purple">
              <User className="cyber-icon-purple" />
            </div>
            <h2 className="cyber-title">Create User</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="cyber-form">
            <div>
              <label className="cyber-label">Username</label>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                  maxLength: { value: 30, message: "Max 30 characters" },
                })}
                className={cyberFieldClass(errors, "username")}
                placeholder="johndoe"
              />
              {errors.username && (
                <p className="cyber-error">⚠ {errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="cyber-label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={cyberFieldClass(errors, "email")}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="cyber-error">⚠ {errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="cyber-label">Password</label>
              <input
                type="password"
                {...register("hashedPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className={cyberFieldClass(errors, "hashedPassword")}
                placeholder="••••••••"
              />
              {errors.hashedPassword && (
                <p className="cyber-error">⚠ {errors.hashedPassword.message}</p>
              )}
            </div>

            <div className="cyber-grid-2">
              <div>
                <label className="cyber-label">Full Name</label>
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                  className={cyberFieldClass(errors, "fullName")}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="cyber-error">⚠ {errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="cyber-label">Role</label>
                <select
                  {...register("role", { required: "Select a role" })}
                  className={cyberFieldClass(errors, "role")}
                >
                  <option value="">Select Role</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {errors.role && (
                  <p className="cyber-error">⚠ {errors.role.message}</p>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading} className="cyber-submit-purple">
              {loading ? (
                <span className="cyber-submit-loading">
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </span>
              ) : (
                "Save User"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
