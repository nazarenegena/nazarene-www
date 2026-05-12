import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MarqueeCard from './MarqueeCard'

const contacts = [
  {
    number: '01',
    title: 'Email',
    subtitle: 'nazarenewanyaga24@gmail.com',
    href: 'mailto:nazarenewanyaga24@gmail.com',
    bgColor: 'bg-accent/20',
    textColor: 'text-fg',
    marqueeText: 'Email',
    marqueeSpeed: '3s',
  },
  {
    number: '02',
    title: 'GitHub',
    subtitle: '@nazarenegena',
    href: 'https://github.com/nazarenegena',
    bgColor: 'bg-reveal',
    textColor: 'text-fg',
    marqueeText: 'GitHub',
    marqueeSpeed: '4s',
  },
  {
    number: '03',
    title: 'LinkedIn',
    subtitle: 'linkedin.com/in/nazarene-wanyaga',
    href: 'https://linkedin.com/in/nazarene-wanyaga',
    bgColor: 'bg-fg/5',
    textColor: 'text-fg',
    marqueeText: 'LinkedIn',
    marqueeSpeed: '5s',
  },
  {
    number: '04',
    title: 'Phone',
    subtitle: '+254 705 434 749',
    href: 'tel:+254705434749',
    bgColor: 'bg-accent/10',
    textColor: 'text-fg',
    marqueeText: 'Call',
    marqueeSpeed: '3.5s',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.js-card')

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="px-6 sm:px-12 py-20 sm:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="titleLines mb-12 sm:mb-16">
          <div className="flex items-center gap-6 overflow-hidden">
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.03em] text-fg flex-shrink-0">
              Let's build
            </h2>
            <span className="flex-1 h-px bg-border" />
          </div>
          <div className="flex items-center gap-6 overflow-hidden mt-1">
            <span className="flex-1 h-px bg-border" />
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.03em] italic text-accent flex-shrink-0">
              something good.
            </h2>
          </div>
          <div className="h-px bg-border w-full mt-2 scale-x-0 origin-left title-line" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contacts.map((contact) => (
            <div key={contact.number} className="h-[220px] sm:h-[260px]">
              <MarqueeCard
                number={contact.number}
                title={contact.title}
                subtitle={contact.subtitle}
                href={contact.href}
                bgColor={contact.bgColor}
                textColor={contact.textColor}
                marqueeText={contact.marqueeText}
                marqueeSpeed={contact.marqueeSpeed}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
