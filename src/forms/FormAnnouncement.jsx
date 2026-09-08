import { useState } from "react";
import { useForm } from "react-hook-form";
import { Megaphone, Loader2 } from "lucide-react";
import Toast from "../components/Toast";
import { cyberAccentClass, cyberFieldClass } from "../utils/formClasses";
import { getSubmitErrorMessage, postData } from "../utils/apiHelper";

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
      await postData("announcements", {
        title: data.title,
        message: data.message,
        authorEmail: data.authorEmail || null,
        expiresAt: data.expiresAt
          ? new Date(data.expiresAt).toISOString()
          : null,
        active: true,
      });

      setToast({
        type: "success",
        message: "Announcement created successfully! 🎉",
      });
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
          <div className={cyberAccentClass(hasErrors, "amber")} />

          <div className="cyber-header">
            <div className="cyber-icon-box cyber-icon-box-amber">
              <Megaphone className="cyber-icon-amber" />
            </div>
            <h2 className="cyber-title">Create Announcement</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="cyber-form">
            <div>
              <label className="cyber-label">Title</label>
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                  maxLength: { value: 100, message: "Max 100 characters" },
                })}
                className={cyberFieldClass(errors, "title")}
                placeholder="Important Update"
              />
              {errors.title && (
                <p className="cyber-error">⚠ {errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="cyber-label">Message</label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Min 10 characters" },
                })}
                className={cyberFieldClass(errors, "message")}
                placeholder="Type the announcement details here..."
                rows={3}
              />
              {errors.message && (
                <p className="cyber-error">⚠ {errors.message.message}</p>
              )}
            </div>

            <div className="cyber-grid-2">
              <div>
                <label className="cyber-label">
                  Author Email{" "}
                  <span className="cyber-label-hint">(Optional)</span>
                </label>
                <input
                  type="email"
                  {...register("authorEmail", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Valid email needed",
                    },
                  })}
                  className={cyberFieldClass(errors, "authorEmail")}
                  placeholder="admin@example.com"
                />
                {errors.authorEmail && (
                  <p className="cyber-error">⚠ {errors.authorEmail.message}</p>
                )}
              </div>

              <div>
                <label className="cyber-label">
                  Expires At{" "}
                  <span className="cyber-label-hint">(Optional)</span>
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
                  className={cyberFieldClass(errors, "expiresAt")}
                />
                {errors.expiresAt && (
                  <p className="cyber-error">⚠ {errors.expiresAt.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-submit-amber"
            >
              {loading ? (
                <span className="cyber-submit-loading">
                  <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                </span>
              ) : (
                "Save Announcement"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
