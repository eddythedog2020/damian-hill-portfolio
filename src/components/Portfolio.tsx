import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.1
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col py-20 px-6 md:px-10 lg:px-20 gap-10 lg:gap-20 bg-[var(--bg-secondary)]">
      <h2 className="text-3xl md:text-5xl lg:text-[80px] font-extrabold tracking-[-0.02em] uppercase">
        Selected Works
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full mt-8">
        {/* Item 1 */}
        <div ref={el => { itemsRef.current[0] = el; }} className="flex flex-col gap-6 w-full cursor-pointer group">
          <div className="w-full overflow-hidden h-[240px] md:h-[400px] lg:h-[600px] relative">
            <div className="absolute inset-0 bg-[var(--accent-blue)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
            <img 
              src="/portfolio1.png" 
              alt="Photo AI web app mockup" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-[1px] leading-relaxed">
              PHOTO-AI.SHOP<br/>
              AI PHOTO GENERATOR PLATFORM
            </h3>
          </div>
        </div>

        {/* Item 2 Placeholder */}
        <div ref={el => { itemsRef.current[1] = el; }} className="flex flex-col gap-6 w-full cursor-pointer group">
          <div className="w-full overflow-hidden h-[240px] md:h-[400px] lg:h-[600px] bg-[var(--bg-primary)] border border-neutral-800 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[var(--accent-blue)] opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
            <span className="text-[var(--text-secondary)] font-medium tracking-[2px] uppercase">Coming Soon</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[var(--text-secondary)] text-sm md:text-base lg:text-lg font-semibold uppercase tracking-[1px] leading-relaxed">
              PROJECT NAME<br/>
              DESCRIPTION OR ROLE
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
