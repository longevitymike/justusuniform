import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ugcParent1 from "@/assets/ugc-parent-new-1.png";
import ugcParent2 from "@/assets/ugc-parent-2.png";
import ugcParent3 from "@/assets/ugc-parent-3.png";

const ugcPhotos = [
  {
    image: ugcParent1,
    alt: "Parent holding Just Us Uniform pants in home gym"
  },
  {
    image: ugcParent2,
    alt: "Parent showing Just Us Uniform pants in laundry room"
  },
  {
    image: ugcParent3,
    alt: "Parent displaying Just Us Uniform pants at home"
  }
];

export const UGCCarousel = () => {
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
      className="section-padding bg-background" 
      aria-roledescription="carousel" 
      aria-label="Parent photos with Just Us Uniform"
    >
      <div className="container mx-auto container-spacing">
        <h2 className="heading-md text-center mb-8 lg:mb-12">Real Parents, Real Reviews</h2>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {ugcPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_33%]"
                  aria-label={`Parent photo ${index + 1}`}
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={photo.image} 
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground rounded-full p-2 md:p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground rounded-full p-2 md:p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
