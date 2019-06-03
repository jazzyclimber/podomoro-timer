// ------------ Global Constants ----------------
const WORK = 0,
      REST = 1,
      defaultWorkTime = 1 * 7,
      defaultRestTime = 1 * 5;

// ------------ Global selectors ----------------
const startButton = document.querySelector("#play"),
  pauseButton = document.querySelector("#pause"),
  resetButton = document.querySelector("#repeat"),
  settingsButton = document.querySelector("#settings"),
  closeButton = document.querySelector(".close"),
  settingsDisplay = document.querySelector('#settings-display'),
  settingsTimers = [document.querySelector(".work.display"), document.querySelector('.rest.display')],
  displays = [document.querySelector("#work-time"), document.querySelector("#rest-time")],
  addWorkButton = document.querySelector('.work.add-time'),
  subWorkButton = document.querySelector('.work.sub-time');
  addRestButton = document.querySelector(".rest.add-time");
  subRestButton = document.querySelector('.rest.sub-time');

// ----------- vairables --------------------------
let isWork, workTime, restTime, min, sec, actualTime, actualPeriod,
    times = [workTime, restTime],
    session = null;

// --------------- Main functions --------------------

function setPause() {
  session ? session = clearInterval(session) : session = null;
}

function formatTime(time, display) {
  min = Math.floor(time / 60);
  sec = Math.floor(time % 60);

  sec = sec < 10 ? "0" + sec : sec;

  display.textContent = min + ":" + sec;
}

function addWork() {
  ++workTime;
  times[WORK] =  workTime;
  formatTime(workTime, settingsTimers[WORK])
}

function subWork() {
  --workTime;
  times[WORK] = workTime;
  formatTime(workTime, settingsTimers[WORK])
}

function addRest() {
  ++restTime;
  times[REST] = restTime;
  formatTime(restTime, settingsTimers[REST])
}
function subRest() {
  --restTime;
  times[REST] = workTime;
  formatTime(restTime, settingsTimers[REST])
}

function countDown() {
  setPause();

  session = setInterval(function() {
    formatTime(--times[actualPeriod], displays[actualPeriod])

    if (times[actualPeriod] <= 0) {
      resetTimer();
      switchActiveTimer();
      countDown();
    }
  }, 1000);
}

function switchActiveTimer() {
  isWork === true ? isWork = false : isWork = true;
  isWork === true ? actualPeriod = WORK : actualPeriod = REST;

  for(let i = 0; i < displays.length; i++) {
    displays[i].classList.toggle('active');
    displays[i].classList.toggle('passive');
  }
}

function resetTimer() {
  setPause();
  times[WORK] = defaultWorkTime;
  times[REST] = defaultRestTime;
  formatTime(times[actualPeriod], displays[actualPeriod]);
}

function openSettings() {
  setPause();
  settingsDisplay.style.height = "100%";
}
function closeSettingsDisplay() {
  formatTime(times[WORK], displays[WORK]);
  formatTime(times[REST], displays[REST]);
  settingsDisplay.style.height = "0";
}

function init() {
  setPause();
  isWork === false ? switchActiveTimer() : null;
  isWork = true;
  actualPeriod = WORK;
  workTime = defaultWorkTime;
  restTime = defaultRestTime
  times[WORK] = workTime;
  times[REST] = restTime;
  formatTime(times[WORK], displays[WORK]);
  formatTime(times[REST], displays[REST]);
  formatTime(workTime, settingsTimers[WORK])
  formatTime(restTime, settingsTimers[REST])
}

// ------------ Call Functions ---------------

init();
startButton.addEventListener("click", countDown);
pauseButton.addEventListener("click", setPause);
settingsButton.addEventListener("click", openSettings);
closeButton.addEventListener("click", closeSettingsDisplay);
resetButton.addEventListener('click', init);
addWorkButton.addEventListener("click", addWork);
subWorkButton.addEventListener('click', subWork);
addRestButton.addEventListener('click', addRest);
subRestButton.addEventListener('click', subRest);
