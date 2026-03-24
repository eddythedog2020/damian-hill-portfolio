

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row items-center md:items-start justify-between py-12 lg:py-20 px-6 md:px-10 lg:px-20 gap-6 border-t border-neutral-900 mt-20">
      <p className="text-[var(--text-secondary)] text-[10px] md:text-xs lg:text-sm font-medium tracking-[1px] lg:tracking-[2px] uppercase">
        © 2026 Damian Hill. All rights reserved.
      </p>
      
      <a 
        href="mailto:hello@damianhill.design"
        className="text-[var(--accent-blue)] text-[10px] md:text-xs lg:text-sm font-bold tracking-[1px] lg:tracking-[2px] uppercase hover:opacity-80 transition-opacity"
      >
        HELLO@DAMIANHILL.DESIGN
      </a>
    </footer>
  );
}
