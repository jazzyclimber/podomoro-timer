// ------------ Global Variables ----------------
let startButton = document.querySelector("#play"),
  pauseButton = document.querySelector("#pause"),
  display = document.querySelector("#time"),
  timer = 60*25,
  interval = null
  , min, sec;

// ------------ Main Functions -------------------

// Counts Down Whatever Time is in Timer
function countDown() {
  interval = setInterval(function () {
      setFormatTime(--timer)
  }, 1000);
}

// Format and display the appropriate time.
function setFormatTime(duration) {
  min = Math.floor(duration / 60);
  sec = Math.floor(duration % 60);

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  display.textContent = min + ":" + sec;
}

//Clears the interval set in countDown
function setPause() {
  clearInterval(interval)
}

//---------- Functions to call ------------------
setFormatTime(timer);
startButton.addEventListener('click', countDown,);
pauseButton.addEventListener('click', setPause);
