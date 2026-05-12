import LinkReveal from './LinkReveal'

export default function Footer() {
  return (
    <footer className="px-6 sm:px-12 py-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <LinkReveal href="#hero" label="Back to top" className="text-muted" />

        <p className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase">
          Nairobi, Kenya · Frontend Engineer
        </p>
      </div>
    </footer>
  )
}
