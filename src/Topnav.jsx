import React, { useEffect } from "react";

export default function Topnav() {
  useEffect(() => {
    const topNav = document.querySelector("#topnav");
    const handleScroll = () => {
      if (window.scrollY > 0) {
        topNav.style.borderBottom = "2px solid white ";
      } else {
        topNav.style.borderBottom = "2px solid black";
      }
    };
    window.addEventListener("scroll", handleScroll);
    //clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="topnav">
      <div id="tabs">
        <a href="#intro">Intro</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
      </div>
      <div id="socials">
        <a
          href="https://www.linkedin.com/in/jovana-genti%C4%87/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/public/linkedin_light.png" alt="LinkedIn" />
        </a>
        <a
          href="https://github.com/Jovana-Gentic"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/public/github_light.png" alt="GitHub" />
        </a>
      </div>
    </div>
  );
}

// export default Topnav;
