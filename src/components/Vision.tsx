import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createASCIIShift } from '../lib/asciiShift';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visionTextRef = useRef<HTMLHeadingElement>(null);
  const asciiRef = useRef<ReturnType<typeof createASCIIShift> | null>(null);

  useEffect(() => {
    // Initialize ASCII wave hover interaction
    if (visionTextRef.current) {
      asciiRef.current = createASCIIShift(visionTextRef.current, { dur: 1000, spread: 1 });
    }

    const ctx = gsap.context(() => {
      gsap.from(visionTextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (asciiRef.current) {
        asciiRef.current.destroy();
      }
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const { clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty('--posX', `${x - l - w / 2}`);
    el.style.setProperty('--posY', `${y - t - h / 2}`);
  };

  return (
    <section 
      ref={sectionRef} 
      className="w-full flex flex-col py-20 px-6 md:px-10 lg:px-20 gap-8 lg:gap-16 bg-interactive"
      onPointerMove={handlePointerMove}
    >
      <h2 className="text-[var(--text-secondary)] font-bold text-sm md:text-lg lg:text-2xl tracking-[2px] lg:tracking-[4px] uppercase">
        The Vision
      </h2>
      
      <h3 
        ref={visionTextRef}
        className="text-2xl md:text-4xl lg:text-6xl font-black leading-[1.2] tracking-normal lg:tracking-[-0.02em] uppercase max-w-5xl"
      >
        Design is not just sitting down and drawing.<br className="hidden lg:block"/> It's the deliberate act of tearing down expectations<br className="hidden lg:block"/> and rebuilding them from the rubble.<br className="hidden lg:block"/> Animation brings the stillness to life.
      </h3>

      <div className="flex flex-col lg:flex-row gap-16 mt-20">
        <div className="flex flex-col flex-1 gap-6">
          <h4 className="text-xl md:text-2xl font-bold uppercase">Digital Experiences</h4>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            Crafting immersive websites pushed by smooth<br className="hidden lg:block"/> scroll-triggered animations and precise 4K visual assets.
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-6">
          <h4 className="text-xl md:text-2xl font-bold uppercase">Art Direction</h4>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            Leading the visual narrative through striking monochrome<br className="hidden lg:block"/> palettes and unexpected AI-assisted compositions.
          </p>
        </div>
      </div>
    </section>
  );
}
