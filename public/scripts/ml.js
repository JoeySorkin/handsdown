const URL = "https://teachablemachine.withgoogle.com/models/Ou_2Y3sHi/";

let model, webcam, labelContainer, maxPredictions;
var loadingbar = document.getElementById("initload").ldBar;
// Load the image model and setup the gwebcam
async function init() {
  document.getElementById("startml").style.display = "none";
  document.getElementById("initload").style.display = "block";
  var bar1 = new ldBar("#initload");
  bar1.set(1);
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  bar1.set(10);
  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  bar1.set(30);
  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  bar1.set(60);
  webcam = new tmImage.Webcam(350, 350, flip); // width, height, flip
  bar1.set(75);
  await webcam.setup(); // request access to the webcam
  bar1.set(90);
  await webcam.play();
  bar1.set(99);
  window.requestAnimationFrame(loop);
  bar1.set(100);
  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");

  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }

  document.getElementById("initload").style.display = "none";
  document.getElementById("onoffswitchdiv").style.display = "block";
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  alertfunc(document.getElementById("thresholdInput").value);
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict from video element
  window.prediction = await model.predict(webcam.canvas); //global variable
  for (let i = 0; i < maxPredictions; i++) {
    //iteration control
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
