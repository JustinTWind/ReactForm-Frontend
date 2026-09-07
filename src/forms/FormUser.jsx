import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Loader2 } from "lucide-react";
import Toast from "../components/Toast";

const API_URL = "http://localhost:8080/api/users";

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
      const body = {
        username: data.username,
        email: data.email,
        hashedPassword: data.hashedPassword,
        fullName: data.fullName,
        role: data.role,
        active: true,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg =
          res.status === 400
            ? "Bad request — check your input fields."
            : `Server error (${res.status}). Please try again.`;
        setToast({ type: "error", message: msg });
        return;
      }

      setToast({ type: "success", message: "User created successfully! 🎉" });
      reset();
    } catch (err) {
      // I won't use Pino, lol
      console.error("Submission error:", err);
      setToast({
        type: "error",
        message: "Could not connect to the server. Is the backend running?",
      });
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

  const inputClass = (fieldName) =>
    `w-full p-2.5 text-sm rounded-lg outline-none transition-all duration-300
     bg-slate-900/60 text-slate-100 placeholder-slate-500
     border ${
       errors[fieldName]
         ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)] focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
         : "border-slate-700/50 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
     }`;

  const selectClass = (fieldName) =>
    `w-full p-2.5 text-sm rounded-lg outline-none transition-all duration-300
     bg-slate-900/60 text-slate-100
     border ${
       errors[fieldName]
         ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
         : "border-slate-700/50 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
     }`;

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500
          ${
            hasErrors
              ? "bg-red-950/20 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]"
              : "bg-slate-800/40 border-purple-500/20 hover:border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.08)]"
          }
        `}
      >
        <div
          className={`absolute top-0 left-4 right-4 h-[2px] rounded-full transition-colors duration-500
            ${
              hasErrors
                ? "bg-gradient-to-r from-transparent via-red-500 to-transparent"
                : "bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            }
          `}
          style={{
            boxShadow: hasErrors
              ? "0 0 12px rgba(239, 68, 68, 0.6)"
              : "0 0 12px rgba(168, 85, 247, 0.6)",
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30">
            <User className="w-5 h-5 text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
          </div>
          <h2 className="font-bold text-lg text-slate-100 tracking-wide">
            Create User
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 30, message: "Max 30 characters" },
              })}
              className={inputClass("username")}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                ⚠ {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={inputClass("email")}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                ⚠ {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-purple-300/80 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              {...register("hashedPassword", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className={inputClass("hashedPassword")}
              placeholder="••••••••"
            />
            {errors.hashedPassword && (
              <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                ⚠ {errors.hashedPassword.message}
              </p>
            )}
          </div>

          {/* Full Name & Role in a row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-300/80 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                className={inputClass("fullName")}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                  ⚠ {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300/80 mb-1.5 uppercase tracking-wider">
                Role
              </label>
              <select
                {...register("role", { required: "Select a role" })}
                className={selectClass("role")}
              >
                <option value="">Select Role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                  ⚠ {errors.role.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit the shii */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300
              bg-gradient-to-r from-purple-600 to-violet-600
              hover:from-purple-500 hover:to-violet-500
              hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
              active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer
            "
            style={{ boxShadow: "0 0 15px rgba(168, 85, 247, 0.25)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </span>
            ) : (
              "Save User"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
