import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import TextSplit from './TextSplit'

const experienceData = [
  {
    company: 'Okapi Sports',
    role: 'Frontend Engineer',
    start: '09/2025',
    end: 'Present',
    bullets: [
      'Built and maintained frontend features for Okapi\'s sports tech platform using React, Svelte and TypeScript.',
      'Created the Okapi design system including design tokens, component library, and usage documentation.',
      'Collaborated with design and backend teams to deliver responsive, accessible UI components.',
      'Championed frontend best practices including code reviews, testing, and CI/CD integration.',
    ],
  },
  {
    company: 'Outreachy / Mozilla',
    role: 'Open Source Contributor',
    start: '11/2023',
    end: '11/2023',
    bullets: [
      'Contributed to open source projects at Mozilla, specifically the Balrog release management system.',
      'Implemented features, fixed bugs, and improved documentation with a global team.',
    ],
  },
  {
    company: 'ALX-Africa',
    role: 'Software Engineering Fellow',
    start: '11/2022',
    end: '01/2024',
    bullets: [
      'Gained experience in JavaScript, Python, Git, and frontend frameworks.',
      'Applied software architecture principles to build scalable solutions.',
      'Contributed to full-stack projects in remote team environments.',
    ],
  },
  {
    company: 'Hitech Solutions',
    role: 'Frontend Engineer',
    start: '05/2022',
    end: '11/2022',
    bullets: [
      'Developed the Royal Grocery Shoppa e-commerce platform using Next.js, React.js, and Tailwind CSS.',
      'Built reusable UI components to improve code efficiency and consistency.',
      'Delivered a responsive, accessible user experience in collaboration with the product team.',
    ],
  },
  {
    company: 'Sycamore NG',
    role: 'Frontend Engineer',
    start: '11/2021',
    end: '04/2022',
    bullets: [
      'Built user-facing features with Vue.js and Tailwind CSS.',
      'Followed Agile development practices to improve delivery speed.',
      'Participated in code reviews and debugging to maintain code quality.',
    ],
  },
  {
    company: 'Tech4Dev',
    role: 'Software Engineering Fellow',
    start: '03/2021',
    end: '03/2022',
    bullets: [
      'Built responsive web interfaces with React, JavaScript, and SQL.',
      'Prioritised accessibility and performance to support a wider user base.',
    ],
  },
]

const skillCategories = [
  {
    label: 'Languages & Frameworks',
    skills: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Vue.js', 'Svelte', 'HTML5', 'CSS3'],
  },
  {
    label: 'State Management',
    skills: ['Redux', 'Context API'],
  },
  {
    label: 'Styling',
    skills: ['Tailwind CSS', 'Shadcn', 'CSS Modules'],
  },
  {
    label: 'UI/UX',
    skills: ['Design Systems', 'WCAG', 'Figma', 'Wireframing', 'Prototyping', 'Responsive Design'],
  },
  {
    label: 'Testing',
    skills: ['Cypress', 'Jest'],
  },
  {
    label: 'Tools & Workflow',
    skills: ['Git & GitHub', 'Vite', 'CI/CD', 'RESTful APIs', 'Agile / Scrum'],
  },
  {
    label: 'Design Systems',
    skills: ['Design Tokens', 'Component Library Architecture', 'Figma', 'Documentation'],
  },
]

const certifications = [
  { title: 'ALX Software Engineering', issuer: 'ALX-Africa · January 2024' },
  { title: 'Women Techsters Fellowship', issuer: 'Tech4Dev · Class of 2022' },
]

const education = [
  { degree: 'BSc Human Nutrition and Dietetics', school: 'Meru University of Science and Technology', period: '09/2015 – 02/2021' },
]

const languages = [
  { language: 'English', level: 'Fluent' },
  { language: 'Swahili', level: 'Native' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const lines = section.querySelectorAll('.timeline-line')
    const badges = section.querySelectorAll('.skill-badge')
    const infoItems = section.querySelectorAll('.info-item')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.from(lines, {
      scaleX: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
    })

    tl.from(badges, {
      scale: 0.8,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: 'back.out(1.7)',
    }, '-=0.3')

    tl.from(infoItems, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
    }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="px-6 sm:px-12 py-20 sm:py-32">
      <div className="max-w-[1400px] mx-auto">
        <TextSplit
          as="p"
          className="font-display text-[clamp(22px,2.8vw,40px)] leading-[1.3] italic text-accent max-w-[30ch] mb-8"
          type="words"
          stagger={0.06}
          y={20}
        >
          Building for the web — from component architecture to pixel-perfect, performant interfaces.
        </TextSplit>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 mb-20">
          <div>
            <p className="text-[15px] sm:text-[16px] leading-[1.8] text-fg/80 max-w-[48ch]">
              Frontend and JavaScript Engineer with 5 years of experience building scalable,
              accessible web applications using React, Next.js, Vue.js, and Svelte.
              Experienced in building and owning design systems end-to-end, including design tokens,
              component libraries, and documentation. Applies UX fundamentals such as information
              hierarchy, interaction patterns, and accessibility standards to engineering decisions.
            </p>
          </div>

          <div className="space-y-8">
            {experienceData.map((exp) => (
              <div key={exp.company + exp.start}>
                <div className="grid grid-cols-[1fr_auto] gap-4 items-baseline mb-2">
                  <div className="relative">
                    <h3 className="font-display text-[18px] sm:text-[20px] font-bold tracking-[-0.01em] text-fg">
                      {exp.company}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase mt-0.5">
                      {exp.role}
                    </p>
                    <div className="timeline-line h-px bg-border mt-3 scale-x-0 origin-left" />
                  </div>
                  <span className="font-mono text-[11px] text-muted tracking-[0.06em] whitespace-nowrap">
                    {exp.start} — {exp.end}
                  </span>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="font-mono text-[12px] leading-[1.6] text-fg/70 pl-4 relative before:content-['–'] before:absolute before:left-0">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mb-5">
            Technologies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <p className="font-mono text-[9px] tracking-[0.14em] text-muted uppercase mb-3">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge inline-block bg-reveal border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.04em] text-fg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mb-4">
              Certifications
            </p>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.title} className="info-item">
                  <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-fg block">
                    {cert.title}
                  </span>
                  <span className="font-mono text-[10px] text-muted tracking-[0.05em] block mt-0.5">
                    {cert.issuer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mb-4">
              Education
            </p>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.degree} className="info-item">
                  <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-fg block">
                    {edu.degree}
                  </span>
                  <span className="font-mono text-[10px] text-muted tracking-[0.05em] block mt-0.5">
                    {edu.school} · {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mb-4">
              Languages
            </p>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.language} className="info-item">
                  <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-fg block">
                    {lang.language}
                  </span>
                  <span className="font-mono text-[10px] text-muted tracking-[0.05em] block mt-0.5">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
