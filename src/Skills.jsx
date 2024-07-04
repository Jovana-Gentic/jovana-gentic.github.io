import React from "react";
import data from "./data.json";

function Skills() {
  return (
    <div id="skills">
      <p className="title">Skills</p>
      <div id="skills-icons">
        {data.skills.map((skill, figureIndex) => (
          <figure key={figureIndex}>
            <img src={skill.imgSrc} />
            <figcaption>{skill.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Skills;
