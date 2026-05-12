interface LinkRevealProps {
  href: string
  label: string
  className?: string
  target?: string
  rel?: string
}

export default function LinkReveal({ href, label, className = '', target, rel }: LinkRevealProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      className={`link-reveal inline-block overflow-hidden relative leading-[1.25] font-mono text-[11px] tracking-[0.06em] uppercase ${className}`}
    >
      <span className="block transition-transform duration-[0.55s] ease-[cubic-bezier(.645,.045,.355,1)] hover:translate-y-[-105%]">
        {label}
      </span>
    </a>
  )
}
