import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "@/constants";
import TitleHeader from "@/components/TitleHeader";
// import GlowCard from "@/components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Loop through each timeline card and animate them in
    // as the user scrolls to each card
    gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card: HTMLElement) => {
      // Animate the card coming in from the left
      // and fade in
      gsap.from(card, {
        // Move the card in from the left
        xPercent: -100,
        // Make the card invisible at the start
        opacity: 0,
        // Set the origin of the animation to the left side of the card
        transformOrigin: "left left",
        // Animate over 1 second
        duration: 1,
        // Use a power2 ease-in-out curve
        ease: "power2.inOut",
        // Trigger the animation when the card is 80% of the way down the screen
        scrollTrigger: {
          // The card is the trigger element
          trigger: card,
          // Trigger the animation when the card is 80% down the screen
          start: "top 80%",
        },
      });
    });

    // Animate the timeline height as the user scrolls using clip-path
    // from the top of the timeline to 70% down the screen
    // The timeline height should clip from bottom to top
    // as the user scrolls up the screen
    gsap.to(".gradient-line", {
      // Set initial clip-path to hide everything from bottom
      clipPath: "inset(0 0 100% 0)",
      // Animate the timeline height over 1 second
      ease: "power1.inOut",
      // Trigger the animation when the timeline is at the top of the screen
      // and end it when the timeline is at 70% down the screen
      scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top center",
        end: "70% center",
        // Update the animation as the user scrolls
        onUpdate: (self: ScrollTrigger) => {
          // Clip the timeline from bottom based on scroll progress
          // 0% progress = 100% clipped (hidden), 100% progress = 0% clipped (fully visible)
          const clipAmount = (1 - self.progress) * 100;
          gsap.set(".gradient-line", {
            clipPath: `inset(0 0 ${clipAmount}% 0)`,
          });
        },
      },
    });

    // Loop through each expText element and animate them in
    // as the user scrolls to each text element
    gsap.utils.toArray<HTMLElement>(".expText").forEach((text: HTMLElement) => {
      // Animate the text opacity from 0 to 1
      // and move it from the left to its final position
      // over 1 second with a power2 ease-in-out curve
      gsap.from(text, {
        // Set the opacity of the text to 0
        opacity: 0,
        // Move the text from the left to its final position
        // (xPercent: 0 means the text is at its final position)
        xPercent: 0,
        // Animate over 1 second
        duration: 1,
        // Use a power2 ease-in-out curve
        ease: "power2.inOut",
        // Trigger the animation when the text is 60% down the screen
        scrollTrigger: {
          // The text is the trigger element
          trigger: text,
          // Trigger the animation when the text is 60% down the screen
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="relative flex-center z-10 md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Professional Work Experience" sub="💼 My Career Overview" />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, idx) => (
              <div key={`${card.title}_${idx}`} className="exp-card-wrapper">
                {/* <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    <div>
                      <img src={card.imgPath} alt="exp-img" />
                    </div>
                  </GlowCard>
                </div> */}
                {/* <div className="xl:w-4/6"> */}
                <div className="xl:w-full">
                  <div className="flex items-start">
                    {/* <div className="timeline-wrapper absolute top-0 xl:left-[35.5vw] md:left-10 left-5 h-full flex justify-center"> */}
                    <div className="timeline-wrapper absolute top-0 left-9.75 h-full flex justify-center">
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <div className="flex justify-center items-center rounded-full p-4">
                          <img src={card.logoPath} alt="logo" className="size-full" />
                        </div>
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <span className="flex justify-start items-center gap-4 text-gray-400 font-bold">
                          <p className="my-5 text-white-50">💼&nbsp;{card.company}</p>|
                          <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                        </span>
                        <p className="text-[#839CB5] italic">Responsibilities</p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map((responsibility: string, index: number) => (
                            <li key={index} className="text-lg">
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
