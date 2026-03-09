const popup = document.getElementById("florissa-popup");
const closePopupBtn = document.getElementById("close-popup");

const alarmBox = document.getElementById("alarm-box");
const stopAlarmBtn = document.getElementById("stop-alarm-btn");
const alarmSound = document.getElementById("alarm-sound");

const jumpscare = document.getElementById("jumpscare");
const jumpscareImage = document.getElementById("jumpscare-image");
const closeJumpscareBtn = document.getElementById("close-jumpscare");

let popupShown = false;
let alarmActive = false;
let stopClicks = 0;
let alarmTimer = null;
let jumpscareTimer = null;

const jumpscareImages = [
    "../images/gaykids1.png",
    "../images/gaykids2.png",
    "../images/gaykids3.png",
    "../images/gaykids4.png",
    "../images/gaykids5.png",
    "../images/gaykids6.png",
    "../images/gaykids7.png",
    "../images/gaykids8.png",
    "../images/gaykids9.png",
    "../images/gaykids10.png",
    "../images/gaykids11.png",
    "../images/gaykids12.png",
    "../images/gaykids13.png",
    "../images/gaykids14.png",
    "../images/gaykids15.png",
    "../images/gaykids16.png",
    "../images/gaykids17.png",
    "../images/gaykids18.png",
    "../images/gaykids19.png",
    "../images/gaykids20.png",
    "../images/gaykids21.png",
    "../images/gaykids22.png",
    "../images/gaykids23.png",
    "../images/gaykids24.png",
    "../images/gaykids25.png",
    "../images/gaykids26.png",
    "../images/gaykids27.png",
    "../images/gaykids28.png",
    "../images/gaykids29.png",
    "../images/gaykids30.png",
    "../images/gaykids31.png",
    "../images/gaykids32.png",
    "../images/gaykids33.png",
    "../images/gaykids34.png",
    "../images/gaykids35.png",
    "../images/gaykids36.png",
    "../images/gaykids37.png",
    "../images/gaykids38.png",
    "../images/gaykids39.png"
];

// popup bij scroll
window.addEventListener("scroll", () => {
    if (!popupShown && window.scrollY > 500) {
        popup.classList.remove("hidden");
        popupShown = true;
    }
});

closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

// alarm
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
    document.body.classList.add("alarm-flash");

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
    document.body.classList.remove("alarm-flash");

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

// jumpscare
function scheduleNextJumpscare() {
    const randomDelay = Math.floor(Math.random() * 25000) + 12000;
    jumpscareTimer = setTimeout(() => {
        showJumpscare();
    }, randomDelay);
}

function showJumpscare() {
    if (alarmActive) {
        scheduleNextJumpscare();
        return;
    }

    const randomIndex = Math.floor(Math.random() * jumpscareImages.length);
    jumpscareImage.src = jumpscareImages[randomIndex];
    jumpscare.classList.remove("hidden");

    setTimeout(() => {
        if (!jumpscare.classList.contains("hidden")) {
            hideJumpscare();
        }
    }, 2500);
}

function hideJumpscare() {
    jumpscare.classList.add("hidden");
    scheduleNextJumpscare();
}

closeJumpscareBtn.addEventListener("click", hideJumpscare);

// starten
scheduleNextAlarm();
scheduleNextJumpscare();
