import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

import * as tf from "@tensorflow/tfjs";
import data from "./data.json";

function Projects() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const mouseEnter = (event) => {
    const link = event.target;
    const originalText = link.textContent;
    link.textContent = link.getAttribute("href");
    link.dataset.originalText = originalText;
  };

  const mouseLeave = (event) => {
    const link = event.target;
    link.textContent = link.dataset.originalText;
  };

  let model;

  const loadModels = async () => {
    try {
      model = await tf.loadGraphModel("/image_classification_model/model.json");
      console.log("Image model loaded successfully!");
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  const preprocessAndPredictImage = async (file) => {
    let reader = new FileReader();
    reader.onload = function () {
      let img = document.getElementById("image");
      img.onload = async function () {
        let tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([150, 150])
          .toFloat()
          .div(255)
          .expandDims();

        const predictionElement = document.getElementById("prediction");
        predictionElement.style.display = "block";

        const predictions = await model.predict(tensor).data();
        console.log("Image Predictions:", predictions);
        let classification;
        if (predictions.length) {
          classification = Array.from(predictions)
            .map((p) => (p > 0.75 ? "Policeman 👮‍♂️" : "Civilian 🧑"))
            .join(", ");
        } else {
          classification = predictions > 0.75 ? "Policeman 👮‍♂️" : "Civilian 🧑";
        }
        predictionElement.innerText = "Prediction is: " + classification;
      };
      img.src = reader.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  };

  loadModels();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    preprocessAndPredictImage(file);
  };

  return (
    <div id="projects">
      <p className="title">Projects</p>
      <div id="my-projects">
        {data.projects.map((project, projectIndex) => (
          <div className="project" key={projectIndex}>
            <p className="project-title">
              <span className="symbol">[-]</span> {project.title}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              link to project
            </a>
            <p className="description">{project.description}</p>

            {project.learned && (
              <>
                <br />
                <ul>
                  <li>
                    <span style={{ color: "gold" }}>What I learned:</span>
                  </li>
                  {project.learned.map((list, listIndex) => (
                    <li key={listIndex}>{list}</li>
                  ))}
                </ul>
              </>
            )}
            {project.hasDemo && (
              <div className="demo">
                <div className="imgload">
                  <label htmlFor="imageLoader">
                    <input
                      type="file"
                      id="imageLoader"
                      name="imageLoader"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <span className="custom-file-button">Choose Image</span>
                  </label>
                  <img id="image" src="#" />
                  <p id="prediction">Prediction is:</p>
                </div>
                <pre className="scrollable-div">
                  <p>Check out implementation code here.</p>
                  <code className="language-javascript">{project.tfCode}</code>
                </pre>
              </div>
            )}
            {project.video && (
              <>
                <div className="video-container">
                  <video id="blob-game" controls>
                    <source src="/game.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
