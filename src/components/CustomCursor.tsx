import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window
    if (isReduced || isTouch) return

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onEnterInteractive = () => cursor.classList.add('is-active')
    const onLeaveInteractive = () => cursor.classList.remove('is-active')

    const lerp = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.12
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.12

      cursor.style.transform = `translate(${posRef.current.x - 40}px, ${posRef.current.y - 40}px)`
      rafRef.current = requestAnimationFrame(lerp)
    }

    document.addEventListener('mousemove', onMouseMove)

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor], .js-card, nav a'
    )
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    lerp()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[60] will-change-transform"
      style={{ width: 80, height: 80 }}
    >
      <div className="w-full h-full scale-0 transition-transform duration-400 ease-[cubic-bezier(.215,.61,.355,1)] [.is-active_&]:scale-100">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="39.5" stroke="currentColor" className="text-fg/20" strokeWidth="1" />
          <circle cx="40" cy="40" r="39.5" fill="currentColor" className="text-accent/8" />
          <g className="opacity-0 transition-opacity duration-300 delay-150 [.is-active_&]:opacity-100">
            <path
              d="M33 47L47 33"
              stroke="currentColor"
              className="text-fg"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
            <path
              d="M36 33h11v11"
              stroke="currentColor"
              className="text-fg"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
