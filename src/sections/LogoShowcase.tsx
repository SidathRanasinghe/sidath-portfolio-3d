import { logoIconsList } from "@/constants";
import type { LogoIcon } from "@/constants/types";

type LogoIconProps = {
  icon: LogoIcon;
};

const Logo = ({ icon }: LogoIconProps) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative z-10">
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <Logo key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <Logo key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
