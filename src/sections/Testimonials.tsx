import { testimonials } from "@/constants";
import TitleHeader from "@/components/TitleHeader";
import GlowCard from "@/components/GlowCard";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding relative z-10">
      <div className="h-full w-full px-5 md:px-10">
        <TitleHeader title="What People Say About Me?" sub="⭐️ Customer feedback highlights" />

        <div className="mt-16 columns-1 md:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index}>
              <div className="flex items-center gap-3">
                <div>
                  <img src={testimonial.imgPath} alt="" />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
