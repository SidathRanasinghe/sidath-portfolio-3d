import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "@/components/TitleHeader";
import TechIconCardExperience from "@/components/models/tech-logos/TechIconCardExperience";
import { sectionConfigs, techStackIcons } from "@/constants";

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
    // This animation is triggered when the user scrolls to the #skills wrapper
    // The animation starts when the top of the wrapper is at the center of the screen
    // The animation is staggered, meaning each card will animate in sequence
    // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
    );
  });

  return (
    <div id="skills" className="flex-center section-padding relative z-10">
      <div className="h-full w-full px-5 md:px-10">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {/* Loop through the techStackIcons array and create a component for each item. 
              The key is set to the name of the tech stack icon, and the classnames are set to card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg classes are only applied on larger screens. */}
          {sectionConfigs.techStackIcons &&
            techStackIcons.map(techStackIcon => (
              <div
                key={techStackIcon.name}
                className="tech-card card-border group overflow-hidden rounded-lg"
              >
                {/* The tech-card-animated-bg div is used to create a background animation when the component is hovered. */}
                <div className="tech-card-animated-bg" />
                <div className="tech-card-content">
                  {/* The tech-icon-wrapper div contains the TechIconCardExperience component,which renders the 3D model of the tech stack icon. */}
                  <div className="tech-icon-wrapper">
                    <TechIconCardExperience model={techStackIcon} />
                  </div>
                  {/* The padding-x and w-full classes are used to add horizontal padding to the text and make it take up the full width of the component. */}
                  <div className="w-full lg:pb-5 lg:pt-2.5 xl:pb-8 xl:pt-2.5">
                    {/* The p tag contains the name of the tech stack icon. */}
                    <p>{techStackIcon.name}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
