import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      countersRef.current.forEach((counter, index) => {
        if (!counter) return;

        const numberElement = counter.querySelector(".counter-number") as HTMLElement;
        if (!numberElement) return;

        const item = counterItems[index];
        if (!item) return;

        // Set initial value to 0
        gsap.set(numberElement, { innerText: "0" });

        // Create the counting animation
        gsap.to(numberElement, {
          innerText: item.value,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerText: 1 }, // Ensures whole numbers
          scrollTrigger: {
            trigger: "#counter",
            start: "top center",
          },
          // Add the suffix after counting is complete
          onComplete: () => {
            numberElement.textContent = `${item.value}${item.suffix}`;
          },
        });
      });
    },
    { scope: counterRef }
  );

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg mt-32 xl:mt-0">
      <div className="grid-4-cols mx-auto">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              countersRef.current[index] = el;
            }}
            className="flex flex-col justify-center rounded-lg bg-zinc-900 p-10"
          >
            <div className="counter-number mb-2 text-5xl font-bold text-white-50">
              0{item.suffix}
            </div>
            <div className="text-lg text-white-50">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
