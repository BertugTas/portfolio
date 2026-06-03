type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="12" fill="currentColor" fillOpacity="0.06" />

      {/* B: left bar + two D-lobes */}
      <path
        d="M9 13h4v38H9z M13 13h9a9 9 0 0 1 0 18H13z M13 31h10a10 10 0 0 1 0 20H13z"
        fill="currentColor"
      />

      {/* T: horizontal bar + centered stem */}
      <rect x="35" y="13" width="20" height="4" fill="currentColor" />
      <rect x="43" y="13" width="5" height="38" fill="currentColor" />

      {/* Cyan accent dot */}
      <circle cx="53" cy="47" r="2.8" fill="var(--logo-accent, #67e8f9)" />
    </svg>
  );
}
