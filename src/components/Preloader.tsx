import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counter = { value: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove('is-loading')
        document.documentElement.classList.add('is-ready')
      },
    })

    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = String(Math.round(counter.value))
        }
      },
    }, 0)

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.out',
    }, 0)

    tl.to([numberRef.current, percentRef.current, lineRef.current], {
      y: -80,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    })

    tl.to(bgRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.7,
      ease: 'power2.inOut',
    }, '-=0.1')

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
    }, '-=0.3')

    tl.to(containerRef.current, {
      pointerEvents: 'none',
      duration: 0.01,
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 bg-bg will-change-transform" />

      <div className="relative flex items-baseline overflow-hidden">
        <span
          ref={numberRef}
          className="font-display text-[clamp(80px,15vw,200px)] font-black tracking-[-0.04em] text-fg block"
        >
          0
        </span>
        <span
          ref={percentRef}
          className="font-display text-[clamp(80px,15vw,200px)] font-black tracking-[-0.04em] text-fg block"
        >
          %
        </span>
      </div>

      <div
        ref={lineRef}
        className="relative h-[2px] bg-fg w-[clamp(120px,20vw,300px)] mt-4 origin-left scale-x-0 will-change-transform"
      />
    </div>
  )
}
