import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapScroll() {
  const registered = useRef(false)

  useEffect(() => {
    if (registered.current) return
    registered.current = true

    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
}

export function animateInView(
  element: string | Element | Element[],
  vars: gsap.TweenVars,
  scrollTriggerVars?: Omit<ScrollTrigger.Vars, 'trigger'>
) {
  return gsap.from(element, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: element as Element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerVars,
    },
    ...vars,
  })
}
