// ------------ Global Constants ----------------
const WORK_PERIOD = 0,
      REST_PERIOD = 1;

// ------------ Global selectors ----------------
let startButton = document.querySelector("#play"),
  pauseButton = document.querySelector("#pause"),
  resetButton = document.querySelector("#repeat"),
  settingsButton = document.querySelector("#settings"),
  closeSettings = document.querySelector(".close"),
  settingsDisplay = document.querySelector('#settings-display'),
  settingsTimers = [document.querySelector(".work.display"), document.querySelector('.rest.display')],
  displays = [document.querySelector("#work-time"), document.querySelector("#rest-time")],
  addButtons = document.querySelectorAll('.add-time'),
  subButtons = document.querySelectorAll('.sub-time');

//------------ Global Variables ---------------
  let work_time = 1 * 7,
    rest_time = 1 * 5,
    times = [work_time, rest_time],
    settings_times = [work_time, rest_time],
    interval = null,
    min, sec;

// Guard Variables
let actual_period = displays[WORK_PERIOD].classList.contains("active") ? WORK_PERIOD : REST_PERIOD;

// ------------ Main Functions -------------------
// Checks if actual period has ended
function isOver(actual_time) {
  return actual_time <= 0;
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
  times[WORK_PERIOD] = settings_times[WORK_PERIOD] = work_time;
  times[REST_PERIOD] = settings_times[REST_PERIOD] = rest_time;
  updateTimers();
}

// Sometimes we don't want to reset it, but we want to update it.
function updateTimers() {
  setPause();
  for(let i = 0; i < displays.length; i++) {
    setFormatTime(times[i], displays[i]);
    setFormatTime(settings_times[i], settingsTimers[i]);
  }
}

// Open/close settings display
function openSettings() {
  setPause();
  settingsDisplay.style.height = "100%";
}

function closeSettingsDisplay() {
  for(let i = 0; i < displays.length; i++) {
    times[i] = settings_times[i];
  }
  updateTimers();
  settingsDisplay.style.height = "0";
}

function add(period) {
  settings_times[period] += 1;
}

function sub(period) {
  settings_times[period] = Math.max(settings_times[period] - 1, 0);
}

// Receives an array of buttons and a mathOperation function
function setButtonsEvent(buttons, mathOperation) {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      period = button.classList[0] == 'work' ? WORK_PERIOD : REST_PERIOD;
      mathOperation(period);
      setFormatTime(settings_times[period], settingsTimers[period]);
    });
  });
}

// Display setting times
setFormatTime(work_time, settingsTimers[WORK_PERIOD]);
setFormatTime(rest_time, settingsTimers[REST_PERIOD]);

//---------- Functions to call ------------------
resetTimer();
startButton.addEventListener('click', countDown);
pauseButton.addEventListener('click', setPause);
resetButton.addEventListener('click', resetTimer);
settingsButton.addEventListener('click', openSettings);
closeSettings.addEventListener('click', closeSettingsDisplay);
setButtonsEvent(addButtons, add);
setButtonsEvent(subButtons, sub);
