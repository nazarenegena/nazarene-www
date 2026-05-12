import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const lenisInstance = { current: null as any }
const scrollListeners = new Set<(e: any) => void>()

export function useSmoothScroll() {
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const init = async () => {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      lenisInstance.current = lenis

      lenis.on('scroll', (e: any) => {
        scrollListeners.forEach(listener => listener(e))
        ScrollTrigger.update()
      })

      return () => {
        lenis.destroy()
        lenisInstance.current = null
        scrollListeners.clear()
      }
    }

    const cleanup = init()
    return () => { cleanup?.then(fn => fn()) }
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
