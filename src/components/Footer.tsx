import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LinkReveal from './LinkReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const items = footer.querySelectorAll<HTMLElement>('.footer-item')

    gsap.from(items, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <footer ref={footerRef} className="px-6 sm:px-12 py-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="footer-item">
          <LinkReveal href="#hero" label="Back to top" className="text-muted" />
        </div>

        <p className="footer-item font-mono text-[10px] tracking-[0.06em] text-muted uppercase">
          Nairobi, Kenya · Frontend Engineer
        </p>
      </div>
    </footer>
  )
}
