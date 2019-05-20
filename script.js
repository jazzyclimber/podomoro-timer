// ------------ Global Constants ----------------
const WORK_PERIOD = 0,
      REST_PERIOD = 1;

// ------------ Global slectors ----------------
let startButton = document.querySelector("#play"),
  pauseButton = document.querySelector("#pause"),
  resetButton = document.querySelector("#repeat"),
  settingsButton = document.querySelector("#settings"),
  closeSettings = document.querySelector(".close"),
  settingsDisplay = document.querySelector('#settings-display'),
  workAmount = document.querySelector(".work.display"),
  restAmount = document.querySelector('.rest.display'),
  displays = [document.querySelector("#work-time"), document.querySelector("#rest-time")];

//------------ Global Variables ---------------
  let work_time = 1 * 7,
    rest_time = 1 * 5,
    times = [work_time, rest_time],
    interval = null,
    min, sec;

// Guard Variables
let actual_period = displays[WORK_PERIOD].classList.contains("active") ? WORK_PERIOD : REST_PERIOD;

// ------------ Main Functions -------------------
// Checks if actual period has ended
function isOver(actual_time) {
  return actual_time === 0;
}

// Change displays
function changeDisplays() {
  for(let i = 0; i < displays.length; i++) {
    if(displays[i].className === 'active') {
      displays[i].className = 'passive';
    } else {
      displays[i].className = 'active';
    }
  }
  actual_period = (actual_period + 1) % displays.length;
}

// Counts Down Whatever Time is in Timer
function countDown() {
  setPause();

  interval = setInterval(function() {
    setFormatTime(--times[actual_period], displays[actual_period]);

    if (isOver(times[actual_period])) {
      setPause();
      resetTimer();
      changeDisplays();
      countDown();
    }

  }, 1000);
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
  times[WORK_PERIOD] = work_time;
  times[REST_PERIOD] = rest_time;
  interval ? setPause() : null ;
  for(let i = 0; i < displays.length; i++) {
    setFormatTime(times[i], displays[i]);
  }
}

// Open/close settings display
function openSettings() {
  settingsDisplay.style.height = "100%";
}
function closeSettingsDisplay() {
  settingsDisplay.style.height = "0";
}

// Display setting times
setFormatTime(work_time, workAmount);
setFormatTime(rest_time, restAmount);


//---------- Functions to call ------------------
resetTimer();
startButton.addEventListener('click', countDown);
pauseButton.addEventListener('click', setPause);
resetButton.addEventListener('click', resetTimer);
settingsButton.addEventListener('click', openSettings);
closeSettings.addEventListener('click', closeSettingsDisplay);
