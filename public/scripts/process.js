let togState = false;

function checkToggle() {
  if (togState == false) {
    console.log("tog_true");
    document.getElementById("advancedOpt").style.display = "block";
    togState = true;
  } else {
    console.log("tog_false");
    document.getElementById("advancedOpt").style.display = "none";
    togState = false;
  }
}

var audioTone = new Audio("tone.mp3");
function alertfunc(threshold) {
  //threshold out of 100
  if (prediction[1].probability > threshold / 100) {
    //prediction (index 1) is the class faceTouch
    console.log("THRESHOLD PASSED");
    audioTone.play();
  } else {
    setTimeout(alertfunc, document.getElementById("alertInput").value);
  }
}
