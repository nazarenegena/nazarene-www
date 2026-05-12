import { useState, useEffect } from 'react'

export default function TimeDisplay() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeInNairobi = time.toLocaleTimeString('en-KE', {
    timeZone: 'Africa/Nairobi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div className="text-right">
      <span className="font-mono text-[10px] text-muted tracking-[0.08em] uppercase block">Nairobi</span>
      <span className="font-mono text-[12px] text-fg tracking-[0.06em] block">{timeInNairobi}</span>
    </div>
  )
}
