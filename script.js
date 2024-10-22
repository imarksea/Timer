let startTime, updatedTime, difference, tInterval, running = false;
let timeDisplay, startStopBtn, resetBtn;

const app = document.getElementById('app');

// Function to render the stopwatch page
function renderStopwatch() {
    app.innerHTML = `
        <div id="stopwatch">
            <div id="time">00:00:00</div>
            <div id="timebtn">
                <button id="startStopBtn">Start</button>
                <button id="resetBtn">Reset</button>
                <a href="#/time"><button id="timePageBtn">Time</button></a>
            </div>
        </div>
    `;
    
    // Now select the elements and attach event listeners after rendering the HTML
    timeDisplay = document.getElementById('time');
    startStopBtn = document.getElementById('startStopBtn');
    resetBtn = document.getElementById('resetBtn');
    
    startStopBtn.addEventListener('click', startStop);
    resetBtn.addEventListener('click', reset);
}

// Function to render the live time page
function renderTimePage() {
    app.innerHTML = `
        <div id="timePage">
            <div id="liveTime">00:00:00</div>
            <a href="#/"><button>Go Back</button></a>
        </div>
    `;
    
    const liveTimeDisplay = document.getElementById('liveTime');
    
    // Update the live time every second
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        liveTimeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// Start/Stop function for the stopwatch
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

// Update function for the stopwatch
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeDisplay.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Reset function for the stopwatch
function reset() {
    clearInterval(tInterval);
    running = false;
    timeDisplay.innerHTML = "00:00:00";
    startStopBtn.innerHTML = 'Start';
}

// Simple client-side routing based on hash changes
function handleRouting() {
    const hash = window.location.hash;
    
    if (hash === '#/time') {
        renderTimePage();
    } else {
        renderStopwatch();
    }
}

// Initial load and hash change listener
window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);
