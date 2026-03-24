import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { createASCIIShift } from '../lib/asciiShift';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const asciiRef = useRef<ReturnType<typeof createASCIIShift> | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      });

      // Fade text in
      gsap.from(subTextRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });

      // Split the image animation into entrance fade and infinite zoom loop
      gsap.fromTo(imgRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.8 }
      );

      gsap.fromTo(imgRef.current,
        { scale: 1.02 },
        {
          scale: 1.08,
          duration: 12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        }
      );
    }, heroRef);

    if (paragraphRef.current) {
      asciiRef.current = createASCIIShift(paragraphRef.current, { dur: 1000, spread: 1 });
    }

    return () => {
      ctx.revert();
      if (asciiRef.current) {
        asciiRef.current.destroy();
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="w-full flex flex-col pt-20 pb-10 px-6 md:px-10 lg:px-20 gap-8 lg:gap-16">
      <div className="flex flex-col w-full">
        <h1 
          ref={textRef}
          className="glitch-text font-playfair text-[56px] md:text-[96px] lg:text-[140px] font-black leading-[0.9] tracking-[-0.02em] md:tracking-[-0.03em] uppercase w-fit"
          data-text="Damian Hill"
        >
          Damian Hill
        </h1>
        
        <div ref={subTextRef} className="flex flex-col gap-4 mt-6 lg:mt-10">
          <p 
            ref={paragraphRef}
            className="as text-[var(--text-secondary)] font-medium text-sm md:text-base lg:text-xl tracking-[1px] lg:tracking-[2px] leading-relaxed max-w-lg uppercase"
          >
            Imagination out of the box.<br/>
            Creative Director & Designer.
          </p>
          <p className="text-[var(--accent-blue)] font-semibold text-[10px] md:text-xs lg:text-sm tracking-[2px] lg:tracking-[4px] mt-4 uppercase">
            ( Scroll to explore )
          </p>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[400px] lg:h-[800px] overflow-hidden mt-8">
        <div ref={imgRef} className="relative w-full h-full group cursor-crosshair">
          <img 
            src="/hero.png" 
            alt="Abstract monochromatic architectural forms with a subtle electric blue streak" 
            className="w-full h-full object-cover rounded-none"
          />
          <img 
            src="/hero.png" 
            alt="Gleaming electric blue neon variant of the architecture" 
            className="absolute inset-0 w-full h-full object-cover rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 saturate-[8] brightness-[1.8] contrast-[1.2]"
          />
        </div>
      </div>
    </section>
  );
}
