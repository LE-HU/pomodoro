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

let running = false;
let activeSession = true;

console.log("kurwa mać");

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

function timeCountdown(duration) {
  //convert 25:00 to 25 minutes and 00 seconds by split
  let timer = parseInt(duration.split(":")[0]) * 60 +
  parseInt(duration.split(":")[1]);
  let minutes, seconds;

  // interval function
  let timeInterval = setInterval(function () {

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
  }, 1000);

};





// function startTimer(duration, display) {
//     let timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
// };

// function timer(minutes) {
//   // minutes = number of minutes to countdown
//     display = document.querySelector('#time-left');
//     let seconds = 60 * minutes,
//     startTimer(seconds, display);
// };















// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.