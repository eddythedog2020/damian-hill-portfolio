import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visionTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col py-20 px-6 md:px-10 lg:px-20 gap-8 lg:gap-16">
      <h2 className="text-[var(--text-secondary)] font-bold text-sm md:text-lg lg:text-2xl tracking-[2px] lg:tracking-[4px] uppercase">
        The Vision
      </h2>
      
      <h3 
        ref={visionTextRef}
        className="text-2xl md:text-4xl lg:text-6xl font-black leading-[1.2] tracking-normal lg:tracking-[-0.02em] uppercase max-w-5xl"
      >
        Design is not just sitting down and drawing. It's the deliberate act of tearing down expectations and rebuilding them from the rubble. Animation brings the stillness to life.
      </h3>

      <div className="flex flex-col lg:flex-row gap-16 mt-20">
        <div className="flex flex-col flex-1 gap-6">
          <h4 className="text-xl md:text-2xl font-bold uppercase">Digital Experiences</h4>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            Crafting immersive websites pushed by smooth scroll-triggered animations and precise 4K visual assets.
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-6">
          <h4 className="text-xl md:text-2xl font-bold uppercase">Art Direction</h4>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            Leading the visual narrative through striking monochrome palettes and unexpected AI-assisted compositions.
          </p>
        </div>
      </div>
    </section>
  );
}
