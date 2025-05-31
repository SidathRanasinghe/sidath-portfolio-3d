import { useCallback, useEffect, useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import LinkButton from "@/components/common/LinkButton";
import WelcomeExperience from "@/components/models/welcome/WelcomeExperience";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// import Fade from "embla-carousel-fade";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroTitles, sectionConfigs, selfDescription } from "@/constants";
import type { HeroTitle } from "@/constants/types";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useGSAP((): void => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  }, []);

  useEffect((): (() => void) | void => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = (): void => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return (): void => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number): void => {
      if (api) {
        api.scrollTo(index);
      }
    },
    [api]
  );

  const handleDotClick = (index: number): void => {
    scrollTo(index);
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            {/* Carousel for Hero Titles */}
            {sectionConfigs.heroTitles && (
              <Carousel
                setApi={setApi}
                className="w-full pointer-events-none z-10"
                plugins={[
                  Autoplay({
                    delay: 10000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                  // Fade(),
                ]}
                opts={{
                  align: "start" as const,
                  loop: true,
                  dragFree: false,
                }}
              >
                <CarouselContent className="-ml-0">
                  {heroTitles.map((title: HeroTitle, i: number) => (
                    <CarouselItem key={`carousel_${i}`} className="pl-0 basis-full">
                      <div className="hero-text w-full">
                        {title.lines.map((line: string, index: number) =>
                          index === 0 ? (
                            <h1 key={`t_${i}_l_${index}`}>
                              {line}
                              <span className="slide">
                                <span className="wrapper">
                                  {title.animatedTerms.map((term: string, idx: number) => (
                                    <span
                                      key={`t_${i}_l_${index}_t_${idx}`}
                                      className="flex items-center pb-2"
                                    >
                                      {term}
                                    </span>
                                  ))}
                                </span>
                              </span>
                            </h1>
                          ) : (
                            <h1 key={`t_${i}_l_${index}`}>{line}</h1>
                          )
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Dot Navigation */}
                <div className="relative flex justify-start w-fit gap-2 mt-7 pointer-events-auto">
                  {Array.from({ length: count }, (_: undefined, index: number) => (
                    <button
                      key={index}
                      onClick={(): void => handleDotClick(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                        index === current - 1
                          ? "bg-white scale-110"
                          : "bg-white/40 hover:bg-white/60"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                      type="button"
                    />
                  ))}
                </div>
              </Carousel>
            )}

            {sectionConfigs.selfDescription && (
              <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                {selfDescription}
              </p>
            )}

            <LinkButton text="See My Work" className="md:w-80 md:h-16 w-60 h-12" id="counter" />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout cursor-grab">
            <WelcomeExperience />
          </div>
        </figure>
      </div>

      {sectionConfigs.myWorksCounter && <AnimatedCounter />}
    </section>
  );
};

export default Hero;
