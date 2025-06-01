import { useState, useEffect } from "react";
import { navLinks, sectionConfigs } from "@/constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = (): void => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled: boolean = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <div className="h-12 w-fit flex justify-center items-center p-0 hover:scale-105 hover:translate-x-0.5">
          <a href="#hero" className="size-full logo flex justify-center items-baseline">
            <img src="/images/logos/sidath.io.2.png" alt="logo" className="size-full" />
          </a>
        </div>

        {sectionConfigs.navLinks && (
          <nav className="desktop">
            <ul>
              {navLinks.map(({ link, name }: { link: string; name: string }) => (
                <li key={name} className="group">
                  <a href={link}>
                    <span>{name}</span>
                    <span className="underline" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
