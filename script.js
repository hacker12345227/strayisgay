const popup = document.getElementById("florissa-popup");
const closePopupBtn = document.getElementById("close-popup");

const alarmBox = document.getElementById("alarm-box");
const stopAlarmBtn = document.getElementById("stop-alarm-btn");
const alarmSound = document.getElementById("alarm-sound");

const jumpscare = document.getElementById("jumpscare");
const jumpscareImage = document.getElementById("jumpscare-image");
const closeJumpscare = document.getElementById("close-jumpscare");

let alarmActive=false;
let stopClicks=0;

window.addEventListener("scroll",()=>{
if(window.scrollY>500){
popup.classList.remove("hidden");
}
});

closePopupBtn.onclick=()=>{
popup.classList.add("hidden");
};

function startAlarm(){

alarmActive=true;
stopClicks=0;

alarmBox.classList.remove("hidden");
document.body.classList.add("alarm-flash");

alarmSound.play().catch(()=>{});

}

function stopAlarm(){

alarmActive=false;

alarmBox.classList.add("hidden");
document.body.classList.remove("alarm-flash");

alarmSound.pause();
alarmSound.currentTime=0;

scheduleAlarm();

}

stopAlarmBtn.onclick=()=>{

stopClicks++;
stopAlarmBtn.textContent=`Stop alarm (${stopClicks}/10)`;

if(stopClicks>=10){
stopAlarm();
}

};

function scheduleAlarm(){

let delay=Math.random()*20000+15000;

setTimeout(()=>{
startAlarm();
},delay);

}

const jumpscareImages=[
"../images/gaykids1.png",
"../images/gaykids2.png",
"../images/gaykids3.png",
"../images/gaykids4.png",
"../images/gaykids5.png",
"../images/gaykids6.png",
"../images/gaykids7.png",
"../images/gaykids8.png",
"../images/gaykids9.png",
"../images/gaykids10.png"
];

function randomJumpscare(){

let delay=Math.random()*20000+10000;

setTimeout(()=>{

let random=jumpscareImages[Math.floor(Math.random()*jumpscareImages.length)];

jumpscareImage.src=random;

jumpscare.classList.remove("hidden");

setTimeout(()=>{
jumpscare.classList.add("hidden");
randomJumpscare();
},2000);

},delay);

}

closeJumpscare.onclick=()=>{
jumpscare.classList.add("hidden");
};

scheduleAlarm();
randomJumpscare();
