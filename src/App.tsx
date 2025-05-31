import BgBanner from "./components/models/bg-banner/BgBanner";
import NavBar from "./components/NavBar";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import FeatureCards from "./sections/FeatureCards";
import Hero from "./sections/Hero";
import LogoShowcase from "./sections/LogoShowcase";
import ShowcaseSection from "./sections/ShowcaseSection";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import { sectionConfigs } from "./constants";

const App = () => {
  return (
    <>
      <BgBanner />
      <div className="size-full overflow-auto z-[1]">
        <NavBar />
        <Hero />
        {sectionConfigs.projectsShowCase && <ShowcaseSection />}
        {sectionConfigs.companiesLogoRow && <LogoShowcase />}
        {sectionConfigs.abilities && <FeatureCards />}
        {sectionConfigs.experience && <Experience />}
        {(sectionConfigs.techStackIcons || sectionConfigs.techStackImgs) && <TechStack />}
        {sectionConfigs.testimonials && <Testimonials />}
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
