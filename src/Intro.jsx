import React from "react";

function Intro() {
  const resumeClick = () => {
    window.open("/CV.pdf", "_blank");
  };

  return (
    <div id="intro">
      <h1>
        Hi,I'm
        <br />
        Jovana.
      </h1>
      <div id="short-description-div">
        <img src="/jovana2.jpg" />
        <p id="short-description">
          I enjoy coding and all things tech. I am currently passionate
          about&nbsp;<span>deep learning</span>, <span>web dev</span>, and on my
          way to mastering <span>C</span> and <span>Linux</span> programming. :)
        </p>
      </div>
      <p id="click-to-view-resume" onClick={resumeClick}>
        Click to view resume
      </p>
    </div>
  );
}

export default Intro;
