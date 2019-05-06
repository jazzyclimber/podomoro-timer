// ------------ Global Variables ----------------
var startButton = document.querySelector("#play"),
 display = document.querySelector("#time"),
 timer = 60*25;
let min, sec;


// ------------ Main Functions -------------------


function startTimer(duration, display) {
  let timer = duration, min, sec;

  setInterval(function() {
    min = parseInt(timer / 60, 10);
    sec = parseInt(timer % 60, 10);

    // Add and extra 0 if the time is less than 10x
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    display.textContent = min + ":" + sec;

    if (--timer < 0) {
      timer = duration
    }
  }, 1000)
}

//starts timer when play button is pushed
startButton.addEventListener("click", function() {
  startTimer(timer, display);
});
