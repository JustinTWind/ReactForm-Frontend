import { useState } from "react";
import { useForm } from "react-hook-form";
import { Megaphone, Loader2 } from "lucide-react";
import Toast from "../components/Toast";

const API_URL = "http://localhost:8080/api/announcements";

export default function FormAnnouncement() {
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
        title: data.title,
        message: data.message,
        authorEmail: data.authorEmail || null,
        expiresAt: data.expiresAt
          ? new Date(data.expiresAt).toISOString()
          : null,
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

      setToast({
        type: "success",
        message: "Announcement created successfully! 🎉",
      });
      reset();
    } catch (err) {
      // I won't use Pino, lol x2
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
         : "border-slate-700/50 focus:border-amber-500 focus:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
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
              : "bg-slate-800/40 border-amber-500/20 hover:border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.08)]"
          }
        `}
      >
        <div
          className={`absolute top-0 left-4 right-4 h-[2px] rounded-full transition-colors duration-500
            ${
              hasErrors
                ? "bg-gradient-to-r from-transparent via-red-500 to-transparent"
                : "bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            }
          `}
          style={{
            boxShadow: hasErrors
              ? "0 0 12px rgba(239, 68, 68, 0.6)"
              : "0 0 12px rgba(245, 158, 11, 0.6)",
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30">
            <Megaphone className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
          </div>
          <h2 className="font-bold text-lg text-slate-100 tracking-wide">
            Create Announcement
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-amber-300/80 mb-1.5 uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 100, message: "Max 100 characters" },
              })}
              className={inputClass("title")}
              placeholder="Important Update"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                ⚠ {errors.title.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-amber-300/80 mb-1.5 uppercase tracking-wider">
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Min 10 characters" },
              })}
              className={inputClass("message")}
              placeholder="Type the announcement details here..."
              rows={3}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                ⚠ {errors.message.message}
              </p>
            )}
          </div>

          {/* Author Email & Expiration in the seim row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-amber-300/80 mb-1.5 uppercase tracking-wider">
                Author Email{" "}
                <span className="text-slate-500 lowercase normal-case text-[10px]">
                  (Optional)
                </span>
              </label>
              <input
                type="email"
                {...register("authorEmail", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Valid email needed",
                  },
                })}
                className={inputClass("authorEmail")}
                placeholder="admin@example.com"
              />
              {errors.authorEmail && (
                <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                  ⚠ {errors.authorEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300/80 mb-1.5 uppercase tracking-wider">
                Expires At{" "}
                <span className="text-slate-500 lowercase normal-case text-[10px]">
                  (Optional)
                </span>
              </label>
              <input
                type="datetime-local"
                {...register("expiresAt", {
                  validate: (value) => {
                    if (!value) return true;
                    return (
                      new Date(value) > new Date() || "Must be a future date"
                    );
                  },
                })}
                className={inputClass("expiresAt")}
              />
              {errors.expiresAt && (
                <p className="text-red-400 text-xs mt-1 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">
                  ⚠ {errors.expiresAt.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit the shii */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300
              bg-gradient-to-r from-amber-600 to-orange-600
              hover:from-amber-500 hover:to-orange-500
              hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]
              active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer
            "
            style={{ boxShadow: "0 0 15px rgba(245, 158, 11, 0.25)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
              </span>
            ) : (
              "Save Announcement"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
