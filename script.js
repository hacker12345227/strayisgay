const popup = document.getElementById("florissa-popup");
const closePopupBtn = document.getElementById("close-popup");

const alarmBox = document.getElementById("alarm-box");
const stopAlarmBtn = document.getElementById("stop-alarm-btn");
const alarmSound = document.getElementById("alarm-sound");

const jumpscare = document.getElementById("jumpscare");
const jumpscareImage = document.getElementById("jumpscare-image");
const closeJumpscareBtn = document.getElementById("close-jumpscare");

const trollMessage = document.getElementById("troll-message");
const fakeCrash = document.getElementById("fake-crash");

// Han summon
const summonBtn = document.getElementById("summon-btn");
const hanSummon = document.getElementById("han-summon");
const closeSummonBtn = document.getElementById("close-summon");

let popupShown = false;
let alarmActive = false;
let stopClicks = 0;
let reverseScroll = false;

const titles = [
    "GAY KIDS?!?!?!",
    "Florissa detected",
    "STRAYKIDS ALERT",
    "bro no homo",
    "gaykid database loading..."
];

const trollTexts = [
    "Florissa detected",
    "Too much Stray Kids detected",
    "gaykid.exe running",
    "bromance level critical",
    "STRAYKIDS ENERGY OVERLOAD",
    "bias protection mode enabled",
    "gaykid archive unlocked"
];

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
    "../images/gaykids39.png",
    "../images/gaykids40.png"
];

// popup bij scroll
window.addEventListener("scroll", () => {
    if (popup && !popupShown && window.scrollY > 500) {
        popup.classList.remove("hidden");
        popupShown = true;
    }
});

if (closePopupBtn && popup) {
    closePopupBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
}

// alarm
function scheduleNextAlarm() {
    if (!alarmBox || !stopAlarmBtn) return;

    const randomDelay = Math.floor(Math.random() * 20000) + 15000;
    setTimeout(() => {
        startAlarm();
    }, randomDelay);
}

function startAlarm() {
    if (!alarmBox || !stopAlarmBtn || alarmActive) return;

    alarmActive = true;
    stopClicks = 0;
    stopAlarmBtn.textContent = `Stop alarm (${stopClicks}/10)`;
    alarmBox.classList.remove("hidden");
    document.body.classList.add("alarm-flash");
    document.body.classList.add("screen-shake");

    if (alarmSound) {
        alarmSound.currentTime = 0;
        alarmSound.play().catch(() => {});
    }
}

function stopAlarm() {
    if (!alarmBox) return;

    alarmActive = false;
    alarmBox.classList.add("hidden");
    document.body.classList.remove("alarm-flash");
    document.body.classList.remove("screen-shake");

    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    scheduleNextAlarm();
}

if (stopAlarmBtn) {
    stopAlarmBtn.addEventListener("click", () => {
        if (!alarmActive) return;

        stopClicks++;
        stopAlarmBtn.textContent = `Stop alarm (${stopClicks}/10)`;

        if (stopClicks >= 10) {
            stopAlarm();
        }
    });
}

// jumpscare
function scheduleNextJumpscare() {
    if (!jumpscare || !jumpscareImage) return;

    const randomDelay = Math.floor(Math.random() * 25000) + 12000;
    setTimeout(() => {
        showJumpscare();
    }, randomDelay);
}

function showJumpscare() {
    if (!jumpscare || !jumpscareImage) return;

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
    if (!jumpscare) return;

    jumpscare.classList.add("hidden");
    scheduleNextJumpscare();
}

if (closeJumpscareBtn) {
    closeJumpscareBtn.addEventListener("click", hideJumpscare);
}

// fake download popup
function fakeDownloadPopup() {
    const delay = Math.random() * 30000 + 15000;

    setTimeout(() => {
        if (document.getElementById("florissa-popup")) {
            alert("Download gestart: straykids_collection_2026.zip");
        }
        fakeDownloadPopup();
    }, delay);
}

// tab title troll
setInterval(() => {
    document.title = titles[Math.floor(Math.random() * titles.length)];
}, 4000);

// reverse scroll troll
setInterval(() => {
    reverseScroll = Math.random() < 0.3;
}, 10000);

window.addEventListener("wheel", (e) => {
    if (reverseScroll && document.getElementById("florissa-popup")) {
        window.scrollBy(0, -e.deltaY);
        e.preventDefault();
    }
}, { passive: false });

// random bericht bovenin
function randomMessage() {
    if (!trollMessage) return;

    const delay = Math.random() * 25000 + 15000;

    setTimeout(() => {
        trollMessage.textContent = trollTexts[Math.floor(Math.random() * trollTexts.length)];
        trollMessage.classList.remove("hidden");

        setTimeout(() => {
            trollMessage.classList.add("hidden");
        }, 4000);

        randomMessage();
    }, delay);
}

// random afbeelding springt
function randomImageJump() {
    const images = document.querySelectorAll(".gallery img");
    if (!images.length) return;

    setInterval(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        randomImage.style.transform = "translateY(-20px) rotate(-2deg)";

        setTimeout(() => {
            randomImage.style.transform = "";
        }, 500);
    }, 6000);
}

// fake crash
function fakeCrashTroll() {
    if (!fakeCrash) return;

    const delay = Math.random() * 60000 + 40000;

    setTimeout(() => {
        fakeCrash.classList.remove("hidden");

        setTimeout(() => {
            fakeCrash.classList.add("hidden");
            fakeCrashTroll();
        }, 3000);
    }, delay);
}

// cursor troll
function randomCursorTroll() {
    setInterval(() => {
        if (Math.random() < 0.25) {
            document.body.style.cursor = "zoom-in";

            setTimeout(() => {
                document.body.style.cursor = "default";
            }, 2000);
        }
    }, 8000);
}

// pagina random kantelen
function randomTiltTroll() {
    setInterval(() => {
        if (Math.random() < 0.15 && !alarmActive) {
            document.body.style.transform = "rotate(1deg)";

            setTimeout(() => {
                document.body.style.transform = "";
            }, 1200);
        }
    }, 9000);
}

// Han summon
if (summonBtn && hanSummon) {
    summonBtn.addEventListener("click", () => {
        hanSummon.classList.remove("hidden");
    });
}

if (closeSummonBtn && hanSummon) {
    closeSummonBtn.addEventListener("click", () => {
        hanSummon.classList.add("hidden");
    });
}

// starten
if (document.getElementById("florissa-popup")) {
    scheduleNextAlarm();
    scheduleNextJumpscare();
    fakeDownloadPopup();
    randomMessage();
    randomImageJump();
    fakeCrashTroll();
    randomCursorTroll();
    randomTiltTroll();
}
