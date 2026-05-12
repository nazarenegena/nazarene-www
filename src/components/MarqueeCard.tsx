import { useRef } from 'react'
import { lenisInstance } from '../hooks/useSmoothScroll'

interface MarqueeCardProps {
  number: string
  title: string
  subtitle?: string
  year?: string
  href?: string
  bgColor?: string
  textColor?: string
  className?: string
  sectionId?: string
  marqueeText?: string
  marqueeSpeed?: string
}

export default function MarqueeCard({
  number,
  title,
  subtitle,
  year,
  href,
  bgColor = 'bg-reveal',
  textColor = 'text-fg',
  className = '',
  sectionId,
  marqueeText,
  marqueeSpeed = '8s',
}: MarqueeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (!sectionId) return
    const target = document.querySelector(sectionId)
    const lenis = lenisInstance.current
    if (target && lenis) {
      lenis.scrollTo(target)
    }
  }

  const content = (
    <div
      ref={cardRef}
      data-cursor
      onClick={handleClick}
      className={`js-card relative overflow-hidden cursor-pointer ${bgColor} ${className}`}
      style={{ '--marquee-speed': marqueeSpeed } as React.CSSProperties}
    >
      <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <span className={`font-mono text-[10px] tracking-[0.12em] ${textColor} opacity-60`}>
            {number}
          </span>
          {year && (
            <span className={`font-mono text-[10px] tracking-[0.12em] ${textColor} opacity-40`}>
              {year}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <h3 className={`font-display text-[clamp(20px,2.5vw,32px)] font-bold tracking-[-0.02em] leading-[1.1] ${textColor}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`font-mono text-[10px] uppercase tracking-[0.12em] mt-1.5 ${textColor} opacity-60`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0 [.js-card:hover_&]:h-full transition-all duration-500 ease-[cubic-bezier(.215,.61,.355,1)] overflow-hidden">
        <div className="marquee-text h-full flex items-center whitespace-nowrap will-change-transform"
          style={{
            animationDuration: marqueeSpeed,
          }}
        >
          <span className="font-display text-[clamp(80px,10vw,160px)] font-black tracking-[-0.03em] text-fg/10 px-4">
            {marqueeText || title}{'  '}{marqueeText || title}{'  '}{marqueeText || title}
          </span>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener" className="block h-full">
        {content}
      </a>
    )
  }

  return content
}
