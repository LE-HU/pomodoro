let sessionSection = document.querySelector("#session");
let timerLabel = document.querySelector("#timer-label");
let sessionLength = document.querySelector("#session-length");
let sessionInc = document.querySelector("#session-increment");
let sessionDec = document.querySelector("#session-decrement");
let breakSection = document.querySelector("#break");
let breakLength = document.querySelector("#break-length");
let breakInc = document.querySelector("#break-increment");
let breakDec = document.querySelector("#break-decrement");
let timeLeft = document.querySelector("#time-left");
let startStopBtn = document.querySelector("#start_stop");
let resetBtn = document.querySelector("#reset");
let beepSound = document.querySelector("#beep");

// flags for running interval & session/break diversification.
let running = false;
let activeSession = true;

// ONLOAD SETUP
window.onload = function () {
  timeLeft.innerText = timerize(sessionLength.innerText);
};

// timerize function to display 25 minutes as 25:00;
const timerize = minutes => {
  let timerX = 60 * minutes;
  let minutesX = parseInt(timerX / 60, 10);
  let secondsX = parseInt(timerX % 60, 10);
  minutesX = minutesX < 10 ? "0" + minutesX : minutesX;
  secondsX = secondsX < 10 ? "0" + secondsX : secondsX;
  return minutesX + ":" + secondsX;
};


// 4 buttons to increment/decrement session/break leng
sessionInc.addEventListener('click', () => {
  if (!running) {
    if (sessionLength.innerText < 60) {
      sessionLength.innerText =
      parseInt(sessionLength.innerText) + 1;
      timeLeft.innerText = timerize(sessionLength.innerText);
    }
  }
});
sessionDec.addEventListener('click', () => {
  if (!running) {
    if (sessionLength.innerText > 1) {
      sessionLength.innerText =
      parseInt(sessionLength.innerText) - 1;
      timeLeft.innerText = timerize(sessionLength.innerText);
    }
  }
});
breakInc.addEventListener('click', () => {
  if (!running) {
    if (breakLength.innerText < 60) {
      breakLength.innerText =
      parseInt(breakLength.innerText) + 1;
    }
  }
});
breakDec.addEventListener('click', () => {
  if (!running) {
    if (breakLength.innerText > 1) {
      breakLength.innerText =
      parseInt(breakLength.innerText) - 1;
    }
  }
});

// start-stop controls ( + reset);
startStopBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    timeCountdown(timeLeft.innerText);
  } else {
    running = false;
    timeCountdown(timeLeft.innerText);
  }
});
resetBtn.addEventListener('click', () => {
  running = false;
  sessionLength.innerText = 25;
  breakLength.innerText = 5;
  timerLabel.innerText = "Session";
  timeLeft.innerText = timerize(sessionLength.innerText);
  beepSound.pause();
  beepSound.currentTime = 0;
});

// main timer function
function timeCountdown(duration) {
  //convert 25:00 to 25 minutes and 00 seconds by split
  let timer = parseInt(duration.split(":")[0]) * 60 +
  parseInt(duration.split(":")[1]);
  let minutes, seconds;

  // interval function
  let timeInterval = setInterval(function () {

    // stop the interval if we click stop.
    if (!running) {
      running = false;
      clearInterval(timeInterval);
      return;
    }

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeLeft.innerText = minutes + ":" + seconds;

    // decide if it's session now or break once we hit 00:00 time.
    if (--timer == -1) {
      if (activeSession) {
        activeSession = false;
        beepSound.play();
        timerLabel.innerText = "Break";
        timeCountdown(timerize(breakLength.innerText));
        return;
      } else {
        activeSession = true;
        beepSound.play();
        timerLabel.innerText = "Session";
        timeCountdown(timerize(sessionLength.innerText));
        return;
      }
    };
  }, 1000); // 1 second = 1000 ms.
};