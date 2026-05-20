export default function CurlyLine({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`w-full h-6 ${className}`}
      viewBox="0 0 200 20" 
      preserveAspectRatio="none"
    >
      <path 
        d="M0 10 C30 0, 50 20, 80 10 C100 0, 120 20, 150 10 C170 0, 190 20, 200 10" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none" 
        className="text-accent/40"
      />
    </svg>
  )
}