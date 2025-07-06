import type { ExpCard, Testimonial } from "@/constants/types";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { getImagePath } from "@/lib/assets";

type GlowCardProps = {
  card: ExpCard | Testimonial;
  index?: number;
  children: ReactNode;
};

const GlowCard = ({ card, index = 0, children }: GlowCardProps) => {
  // refs for all the cards
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // when mouse moves over a card, rotate the glow effect
  const handleMouseMove = (cardIndex: number) => (e: MouseEvent<HTMLDivElement>) => {
    // get the current card
    const cardElement = cardRefs.current[cardIndex];
    if (!cardElement) return;

    // get the mouse position relative to the card
    const rect = cardElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card to the mouse
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    // adjust the angle so that it's between 0 and 360
    angle = (angle + 360) % 360;

    // set the angle as a CSS variable (just the number, not with 'deg')
    cardElement.style.setProperty("--start", `${angle + 60}`);
  };

  // return the card component with the mouse move event
  return (
    <div
      ref={(el: HTMLDivElement | null) => {
        cardRefs.current[index] = el;
      }}
      onMouseMove={handleMouseMove(index)}
      className="card card-border timeline-card mb-5 break-inside-avoid-column rounded-xl p-10"
    >
      <div className="glow" />
      <div className="mb-5 flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src={getImagePath("icons/gold-star.png")} alt="star" className="size-5" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-lg text-white-50">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
