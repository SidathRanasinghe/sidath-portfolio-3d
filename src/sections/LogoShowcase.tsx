import { logoIconsList } from "@/constants";
import type { LogoIcon } from "@/constants/types";

type LogoIconProps = {
  icon: LogoIcon;
};

const Logo = ({ icon }: LogoIconProps) => {
  return (
    <div className="flex-center marquee-item flex-none">
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="relative z-10 my-10 md:my-20">
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-52">
      <div className="marquee-box gap-5 md:gap-12">
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
