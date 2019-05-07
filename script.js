// ------------ Global Variables ----------------
var startButton = document.querySelector("#play"),
  pauseButton = document.querySelector("#pause"),
  display = document.querySelector("#time"),
  isPaused = false,
  timer = 60*25,
  min, sec;

// ------------ Main Functions -------------------

// Counts Down Whatever Time is in Timer
function countDown() {
  isPaused = false;

  setInterval(function () {
    if (!isPaused){
      setFormatTime(--timer)
    }
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

function setPause() {
  isPaused = true;
}

// Functions to call
setFormatTime(timer);
startButton.addEventListener('click', countDown,);
pauseButton.addEventListener('click', setPause);


/* Timer is working. Play and Pause button both work fine.
Issue: when restarting a paued timer - the timer is out of sync.
it is either trying to run multiple iterations of itself,
or it is speeding up it's interval.  
*/
