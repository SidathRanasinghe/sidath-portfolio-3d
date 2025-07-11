import { sectionConfigs, socialImgs } from "@/constants";

const Footer = () => {
  return (
    <footer className="footer relative z-10">
      <div className="footer-container">
        <div className="flex flex-col items-start justify-center sm:!items-center">
          <p className="w-full text-center md:text-start">Terms & Conditions</p>
        </div>
        <div className="socials">
          {sectionConfigs.socialImgs &&
            socialImgs.map((socialImg, index) => (
              <div key={index} className="icon">
                <img src={socialImg.imgPath} alt="social icon" />
              </div>
            ))}
        </div>
        <div className="flex flex-col items-end justify-center sm:items-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Sidath Ranasinghe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
