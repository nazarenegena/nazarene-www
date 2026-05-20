import { useEffect, useRef, createElement, type ElementType } from 'react'
import { gsap } from 'gsap'
import { useTextSplit } from '../hooks/useTextSplit'

interface TextSplitProps {
  children: string
  as?: ElementType
  className?: string
  type?: 'chars' | 'words'
  stagger?: number
  delay?: number
  y?: number
  duration?: number
  scrollTrigger?: boolean
  once?: boolean
}

export default function TextSplit({
  children,
  as: Tag = 'div',
  className = '',
  type = 'chars',
  stagger = 0.02,
  delay = 0,
  y = 30,
  duration = 1.0,
  scrollTrigger = true,
  once = true,
}: TextSplitProps) {
  const elRef = useRef<HTMLElement>(null)
  const { splitChars, splitWords } = useTextSplit()

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const elements = type === 'chars' ? splitChars(el) : splitWords(el)
    if (elements.length === 0) return

    gsap.set(elements, { opacity: 0, y })

    const vars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      ease: 'expo.out',
      stagger,
      delay,
    }

    if (scrollTrigger) {
      gsap.to(elements, {
        ...vars,
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    } else {
      gsap.to(elements, vars)
    }

    return () => {
      gsap.killTweensOf(elements)
    }
  }, [children, type, stagger, delay, y, duration, scrollTrigger, once, splitChars, splitWords])

  return createElement(Tag, { ref: elRef, className, 'data-split': '' }, children)
}
