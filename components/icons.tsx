export function PlayIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3.5 10.5l7-7M4.5 3.5h6v6" />
    </svg>
  );
}
