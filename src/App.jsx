import React from "react";
import Topnav from "./Topnav";
import Intro from "./Intro";
import Skills from "./Skills";
import Projects from "./Projects";

function App() {
  return (
    <div className="App">
      <Topnav />
      <div id="grid">
        <Intro />
        <Skills />
        <Projects />
      </div>
    </div>
  );
}

export default App;
