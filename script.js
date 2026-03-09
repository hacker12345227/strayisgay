const popup = document.getElementById("florissa-popup");
const closePopupBtn = document.getElementById("close-popup");

const alarmBox = document.getElementById("alarm-box");
const stopAlarmBtn = document.getElementById("stop-alarm-btn");
const alarmSound = document.getElementById("alarm-sound");

let popupShown = false;
let alarmActive = false;
let stopClicks = 0;
let alarmTimer = null;

// Florissa popup bij scroll
window.addEventListener("scroll", () => {
    if (!popupShown && window.scrollY > 500) {
        popup.classList.remove("hidden");
        popupShown = true;
    }
});

closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

// Random alarm planner
function scheduleNextAlarm() {
    const randomDelay = Math.floor(Math.random() * 20000) + 15000;
    alarmTimer = setTimeout(() => {
        startAlarm();
    }, randomDelay);
}

function startAlarm() {
    if (alarmActive) return;

    alarmActive = true;
    stopClicks = 0;
    stopAlarmBtn.textContent = `Stop alarm (${stopClicks}/10)`;
    alarmBox.classList.remove("hidden");

    if (alarmSound) {
        alarmSound.currentTime = 0;
        alarmSound.play().catch(() => {
            console.log("Audio kon nog niet automatisch afspelen.");
        });
    }
}

function stopAlarm() {
    alarmActive = false;
    alarmBox.classList.add("hidden");

    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    scheduleNextAlarm();
}

stopAlarmBtn.addEventListener("click", () => {
    if (!alarmActive) return;

    stopClicks++;
    stopAlarmBtn.textContent = `Stop alarm (${stopClicks}/10)`;

    if (stopClicks >= 10) {
        stopAlarm();
    }
});

// Start de eerste random alarm ronde
scheduleNextAlarm();
