import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

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

      gsap.from(subTextRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });

      gsap.from(imgRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.8
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="w-full flex flex-col pt-20 pb-10 px-6 md:px-10 lg:px-20 gap-8 lg:gap-16 relative"
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': mousePos.x, '--mouse-y': mousePos.y } as React.CSSProperties}
    >
      <div className="flex flex-col w-full">
        <h1 
          ref={textRef}
          className="glitch-text text-[56px] md:text-[96px] lg:text-[140px] font-black leading-[0.9] tracking-[-0.02em] md:tracking-[-0.03em] uppercase w-fit"
          data-text="Damian Hill"
        >
          Damian Hill
        </h1>
        
        <div ref={subTextRef} className="flex flex-col gap-4 mt-6 lg:mt-10">
          <p className="text-[var(--text-secondary)] font-medium text-sm md:text-base lg:text-xl tracking-[1px] lg:tracking-[2px] leading-relaxed max-w-lg uppercase">
            Imagination out of the box.<br/>
            Creative Director & Designer.
          </p>
          <p className="text-[var(--accent-blue)] font-semibold text-[10px] md:text-xs lg:text-sm tracking-[2px] lg:tracking-[4px] mt-4 uppercase">
            ( Scroll to explore )
          </p>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[400px] lg:h-[800px] overflow-hidden mt-8">
        <img 
          ref={imgRef}
          src="/hero.png" 
          alt="Abstract monochromatic architectural forms with a subtle electric blue streak" 
          className="w-full h-full object-cover rounded-none"
        />
      </div>
    </section>
  );
}
