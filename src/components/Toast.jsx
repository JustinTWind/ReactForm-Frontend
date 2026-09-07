import { useEffect, useState, useCallback } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Toast({ type = "success", message, onClose }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onClose?.();
    }, 350);
  }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      handleClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [handleClose]);

  const isError = type === "error";

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] max-w-sm w-full transition-all duration-350 ease-out
        ${visible && !exiting ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div
        className={`relative overflow-hidden rounded-xl border backdrop-blur-xl shadow-2xl p-4 flex items-center gap-3
          ${
            isError
              ? "bg-red-950/80 border-red-500/50 shadow-red-500/20"
              : "bg-emerald-950/80 border-emerald-400/50 shadow-emerald-400/20"
          }
        `}
        style={{
          boxShadow: isError
            ? "0 0 25px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.1)"
            : "0 0 25px rgba(52, 211, 153, 0.3), 0 0 60px rgba(52, 211, 153, 0.1)",
        }}
      >
        {/* Neon glow bar on top */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px]
            ${isError ? "bg-gradient-to-r from-red-500 via-pink-500 to-red-500" : "bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"}
          `}
          style={{
            boxShadow: isError
              ? "0 0 10px rgba(239, 68, 68, 0.8)"
              : "0 0 10px rgba(52, 211, 153, 0.8)",
          }}
        />

        {/* Icon */}
        <div className="flex-shrink-0">
          {isError ? (
            <XCircle className="w-6 h-6 text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
          ) : (
            <CheckCircle className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          )}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold ${isError ? "text-red-200" : "text-emerald-200"}`}
          >
            {isError ? "Error" : "Success"}
          </p>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
