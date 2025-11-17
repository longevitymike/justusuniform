import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "These are the only uniform pants my daughter *asks* to wear. Soft, sturdy, and they still look new after countless washes.",
    name: "Uniform Mom, MD"
  },
  {
    quote: "Fit is spot-on and no more morning battles. She can bend, jump, and sit all day without complaints.",
    name: "Dad of 3, TX"
  },
  {
    quote: "As a teacher and mom, I love that they meet dress code and survive recess. Zero knee blowouts so far!",
    name: "Teacher & Mom, CA"
  },
  {
    quote: "Parents at our school keep mentioning the comfort. Reorders came in fast—kids actually like these.",
    name: "School Admin, WA"
  },
  {
    quote: "Great stretch, true to size, and the price is right. We're switching all our uniforms to Just Us.",
    name: "Just Us Customer, NY"
  }
];

const Star = () => (
  <svg 
    className="w-7 h-7 drop-shadow-[0_2px_0_rgba(255,158,27,0.35)]" 
    viewBox="0 0 24 24" 
    fill="hsl(var(--brand-orange))" 
    stroke="hsl(var(--brand-orange-dark))" 
    strokeWidth="1.25" 
    role="img" 
    focusable="false"
    aria-hidden="true"
  >
    <path 
      d="M12 2.8l2.56 5.19 5.73.83c.91.13 1.27 1.25.61 1.89l-4.14 4.03.98 5.9c.16.96-.84 1.68-1.7 1.22L12 19.9l-5.04 2.94c-.86.5-1.86-.26-1.7-1.22l.98-5.9-4.14-4.03c-.66-.64-.3-1.76.61-1.89l5.73-.83L12 2.8z" 
      strokeLinejoin="round" 
    />
  </svg>
);

export const TestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section 
      className="section-padding bg-muted/30" 
      aria-roledescription="carousel" 
      aria-label="Customer testimonials"
    >
      <div className="container mx-auto container-spacing">
        <h2 className="heading-md text-center mb-12 lg:mb-16">What Parents Are Saying</h2>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <article 
                  key={index}
                  className="flex-[0_0_90%] md:flex-[0_0_60%] lg:flex-[0_0_50%] max-w-3xl mx-auto"
                  aria-label={`Testimonial ${index + 1}`}
                >
                  <div className="premium-card text-center space-y-4 p-6 lg:p-8">
                    <div className="flex justify-center gap-1.5 mb-4" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} />
                      ))}
                    </div>
                    <blockquote className="text-base lg:text-xl text-foreground leading-relaxed mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="font-semibold text-sm lg:text-base text-muted-foreground">
                      — {testimonial.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="group relative inline-flex items-center justify-center tap-target w-11 h-11 bg-background text-foreground font-bold border-4 border-foreground transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="group relative inline-flex items-center justify-center tap-target w-11 h-11 bg-background text-foreground font-bold border-4 border-foreground transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
