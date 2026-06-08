import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const lenisInstance = { current: null as Lenis | null }
const scrollListeners = new Set<(e: any) => void>()

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    })

    lenisInstance.current = lenis

    lenis.on('scroll', (e: any) => {
      scrollListeners.forEach(listener => listener(e))
      try { ScrollTrigger.update() } catch {}
    })

    return () => {
      lenis.destroy()
      lenisInstance.current = null
      scrollListeners.clear()
    }
  }, [])
}

export function useLenisScroll(callback: (e: any) => void) {
  useEffect(() => {
    scrollListeners.add(callback)
    return () => { scrollListeners.delete(callback) }
  }, [callback])
}

export function getLenis() {
  return lenisInstance.current
}
