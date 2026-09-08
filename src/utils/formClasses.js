export function cyberFieldClass(errors, fieldName) {
  return errors[fieldName] ? "cyber-input cyber-input-error" : "cyber-input";
}

export function cyberAccentClass(hasErrors, theme = "cyan") {
  if (hasErrors) return "cyber-accent-error cyber-accent-glow-error";

  const accents = {
    cyan: "cyber-accent cyber-accent-glow-cyan",
    purple: "cyber-accent-purple cyber-accent-glow-purple",
    amber: "cyber-accent-amber cyber-accent-glow-amber",
    emerald: "cyber-accent-emerald cyber-accent-glow-emerald",
  };

  return accents[theme] ?? accents.cyan;
}
