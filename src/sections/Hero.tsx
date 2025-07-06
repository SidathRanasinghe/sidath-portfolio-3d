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
      <div className="absolute left-0 top-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex w-screen flex-col justify-center px-5 md:w-full md:px-20">
          <div className="flex flex-col gap-7">
            {/* Carousel for Hero Titles */}
            {sectionConfigs.heroTitles && (
              <Carousel
                setApi={setApi}
                className="pointer-events-none z-10 w-full"
                plugins={[
                  Autoplay({
                    delay: 10000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                opts={{
                  align: "start" as const,
                  loop: true,
                  dragFree: false,
                }}
              >
                <CarouselContent className="-ml-0">
                  {heroTitles.map((title: HeroTitle, i: number) => (
                    <CarouselItem key={`carousel_${i}`} className="basis-full pl-0">
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
                <div className="pointer-events-auto relative mt-7 flex w-fit justify-start gap-2">
                  {Array.from({ length: count }, (_: undefined, index: number) => (
                    <button
                      key={index}
                      onClick={(): void => handleDotClick(index)}
                      className={cn(
                        "h-2 w-2 cursor-pointer rounded-full transition-all duration-300",
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
              <p className="pointer-events-none relative z-10 text-white-50 md:text-xl">
                {selfDescription}
              </p>
            )}

            <LinkButton text="See My Work" className="h-12 w-60 md:h-16 md:w-80" id="counter" />
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
