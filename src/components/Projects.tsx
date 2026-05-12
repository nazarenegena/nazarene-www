import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MarqueeCard from './MarqueeCard'

const projects = [
  {
    number: '01',
    title: 'Yuno',
    subtitle: 'Design Systems',
    year: '2024',
    href: 'https://yuno.somethinglabs.io',
    bgColor: 'bg-accent/20',
    textColor: 'text-fg',
    marqueeText: 'Yuno',
    marqueeSpeed: '3s',
  },
  {
    number: '02',
    title: 'Sahani',
    subtitle: 'Health Tech',
    year: '2025',
    href: 'https://sahani.app',
    bgColor: 'bg-reveal',
    textColor: 'text-fg',
    marqueeText: 'Sahani',
    marqueeSpeed: '3.5s',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.js-card')

    gsap.from(cards, {
      y: 80,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="px-6 sm:px-12 py-20 sm:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="titleLines mb-12 sm:mb-16">
          <div className="flex items-center gap-6 overflow-hidden">
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.03em] text-fg flex-shrink-0">
              Selected
            </h2>
            <span className="flex-1 h-px bg-border" />
          </div>
          <div className="flex items-center gap-6 overflow-hidden mt-1">
            <span className="flex-1 h-px bg-border" />
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.03em] italic text-accent flex-shrink-0">
              Projects
            </h2>
          </div>
          <div className="h-px bg-border w-full mt-2 scale-x-0 origin-left title-line" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project.number} className="h-[280px] sm:h-[320px]">
              <MarqueeCard
                number={project.number}
                title={project.title}
                subtitle={project.subtitle}
                year={project.year}
                href={project.href}
                bgColor={project.bgColor}
                textColor={project.textColor}
                marqueeText={project.marqueeText}
                marqueeSpeed={project.marqueeSpeed}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
