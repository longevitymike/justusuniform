import { useEffect, useRef } from 'react';

interface LogoLoopProps {
  logos: string[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
}

export const LogoLoop = ({
  logos,
  speed = 50,
  direction = 'left',
  logoHeight = 40,
  gap = 60,
  hoverSpeed = 0,
}: LogoLoopProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationId: number;
    let position = 0;
    const actualSpeed = direction === 'left' ? speed : -speed;

    const animate = () => {
      const currentSpeed = isHovering.current ? hoverSpeed : actualSpeed;
      position += currentSpeed / 60;
      
      const scrollWidth = scroller.scrollWidth / 2;
      
      if (Math.abs(position) >= scrollWidth) {
        position = 0;
      }
      
      scroller.style.transform = `translateX(${-position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    scroller.parentElement?.addEventListener('mouseenter', handleMouseEnter);
    scroller.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scroller.parentElement?.removeEventListener('mouseenter', handleMouseEnter);
      scroller.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [speed, direction, hoverSpeed]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={scrollerRef}
        className="flex items-center will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {/* Render logos twice for seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center transition-transform hover:scale-110"
            style={{ height: `${logoHeight}px` }}
          >
            <span className="text-muted-foreground/60 font-semibold text-sm whitespace-nowrap">
              {logo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
