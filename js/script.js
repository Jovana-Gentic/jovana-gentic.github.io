// Click to view resume

const pViewResume = document.querySelector("#click-to-view-resume");

pViewResume.addEventListener("click", function () {
  window.open("media/CV.pdf", "_blank");
});

// Change link text

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".project a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const originalText = link.textContent;
      const href = link.getAttribute("href");
      link.textContent = href;
      link.dataset.originalText = originalText;
    });

    link.addEventListener("mouseleave", function () {
      const originalText = link.dataset.originalText;
      if (originalText) {
        link.textContent = originalText;
      }
    });
  });
});

// TensorFlow model (Image Classification)

let model;

async function loadModels() {
  try {
    model = await tf.loadGraphModel("js/image_classification_model/model.json");
    console.log("Image model loaded successfully!");
  } catch (error) {
    console.error("Error loading models:", error);
  }
}

async function preprocessAndPredictImage(file) {
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
}

loadModels();

document
  .getElementById("imageLoader")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    preprocessAndPredictImage(file);
  });

// Collapse/expand project

document.addEventListener("DOMContentLoaded", () => {
  const projectTitles = document.querySelectorAll(".project-title");
  projectTitles.forEach((projectTitle) => {
    projectTitle.addEventListener("click", () => {
      const project = projectTitle.closest(".project");
      const symbol = projectTitle.querySelector(".symbol");
      project.classList.toggle("collapsed");
      projectTitle.classList.toggle("collapsed");
      if (projectTitle.classList.contains("collapsed")) {
        symbol.textContent = "[+] ";
      } else {
        symbol.textContent = "[-] ";
      }
    });
  });
});

// Video pause

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("blob-game");
  const videoContainer = document.querySelector(".video-container");
  let userPaused = false;
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Function to handle the scroll event
  const handleScroll = () => {
    if (isInViewport(video)) {
      if (!userPaused) {
        video.play();
      }
    } else {
      if (!video.paused) {
        userPaused = true;
        video.pause();
      }
    }
  };
  window.addEventListener("scroll", handleScroll);
  video.addEventListener("play", () => {
    videoContainer.classList.remove("paused");
  });
  video.addEventListener("pause", () => {
    videoContainer.classList.add("paused");
  });
  handleScroll();
});

// change navbar

document.addEventListener("DOMContentLoaded", () => {
  const topNav = document.querySelector("#topnav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      topNav.style.borderBottom = "2px solid white ";
    } else {
      topNav.style.borderBottom = "2px solid black";
    }
  });
});
