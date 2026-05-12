import { useCallback } from 'react'

export function useTextSplit() {
  const splitChars = useCallback((el: HTMLElement) => {
    const text = el.textContent || ''
    el.textContent = ''
    const chars: HTMLSpanElement[] = []
    for (const char of text) {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      el.appendChild(span)
      chars.push(span)
    }
    return chars
  }, [])

  const splitWords = useCallback((el: HTMLElement) => {
    const text = el.textContent || ''
    el.textContent = ''
    const words: HTMLSpanElement[] = text.split(' ').map((word, i, arr) => {
      const span = document.createElement('span')
      span.textContent = word + (i < arr.length - 1 ? '\u00A0' : '')
      span.style.display = 'inline-block'
      el.appendChild(span)
      return span
    })
    return words
  }, [])

  return { splitChars, splitWords }
}
