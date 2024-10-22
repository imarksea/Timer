let startTime, updatedTime, difference, tInterval, running = false;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const liveTimeDisplay = document.getElementById('liveTime');
const showTimeBtn = document.getElementById('showTimeBtn');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeDisplay.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function reset() {
    clearInterval(tInterval);
    running = false;
    timeDisplay.innerHTML = "00:00:00";
    startStopBtn.innerHTML = 'Start';
}

function showLiveTime() {
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        liveTimeDisplay.innerHTML = `Current Time: ${hours}:${minutes}:${seconds}`;
    }, 1000);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
showTimeBtn.addEventListener('click', showLiveTime);
