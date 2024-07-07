let startTime, updatedTime, difference, tInterval, running = false, laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1000);
        running = true;
        startButton.innerHTML = 'Running';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startButton.innerHTML = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    startButton.innerHTML = 'Start';
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        const currentLapTime = display.innerHTML;
        laps.push(currentLapTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map(lap => <div>${lap}</div>).join('');
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    display.innerHTML = ${hours}:${minutes}:${seconds};
}