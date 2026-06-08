import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('revealed')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement

          if (el.hasAttribute('data-reveal-stagger')) {
            const delay = parseInt(el.getAttribute('data-reveal-stagger') || '100', 10)
            Array.from(el.children).forEach((child, i) => {
              const c = child as HTMLElement
              c.style.transitionDelay = `${i * delay}ms`
              c.classList.add('revealed')
            })
          } else {
            el.classList.add('revealed')
          }

          observer.unobserve(el)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
