// ------------ Global Variables ----------------
let startButton = document.querySelector("#play"),
  pauseButton = document.querySelector("#pause"),
  resetButton = document.querySelector("#repeat"),
  work_display = document.querySelector("#work-time"),
  rest_display = document.querySelector("#rest-time"),
  timer = 60*25,
  rest_timer = 60*5,
  interval = null,
  min, sec;

// ------------ Main Functions -------------------

// Counts Down Whatever Time is in Timer
function countDown() {
  startInterval = setInterval(function () {
    setFormatTime(--timer, work_display);
  }, 1000);

  !interval ? interval = startInterval : interval = interval;
}

// Format and display the appropriate time.
function setFormatTime(duration, display) {
  min = Math.floor(duration / 60);
  sec = Math.floor(duration % 60);

  sec = sec < 10 ? "0" + sec : sec;

  display.textContent = min + ":" + sec;
}

// Clears the interval set in countDown
function setPause() {
  interval ? interval = clearInterval(interval) : null;
}

// Resets interval
function resetTimer() {
  timer = 60 * 25;

  interval ? setPause() : null ;
  setFormatTime(timer, work_display);
}

//---------- Functions to call ------------------
setFormatTime(timer, work_display);
setFormatTime(rest_timer, rest_display);
startButton.addEventListener('click', countDown);
pauseButton.addEventListener('click', setPause);
resetButton.addEventListener('click', resetTimer);
