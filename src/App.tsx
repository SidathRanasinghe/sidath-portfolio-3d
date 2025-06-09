import BgBanner from "./components/models/bg-banner/BgBanner";
import NavBar from "./components/NavBar";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import FeatureCards from "./sections/FeatureCards";
import Hero from "./sections/Hero";
import LogoShowcase from "./sections/LogoShowcase";
import ShowcaseSection from "./sections/ShowcaseSection";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import { sectionConfigs } from "./constants";
import TechStack from "./sections/TechStack";

const App = () => {
  return (
    <>
      <BgBanner />
      <div className="z-[1] size-full overflow-auto">
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
