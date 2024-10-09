let startTime, updatedTime, difference;
let tInterval;
let running = false;
let lapCounter = 0;
let currentLapTime;
let totalLaps = [];
const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");
const lapLabelInput = document.getElementById("lapLabel");

// Modal elements
const lapModal = document.getElementById("lapModal");
const closeModal = document.querySelector(".close");
const saveLapButton = document.getElementById("saveLap");

// Event Listeners
startPauseButton.addEventListener("click", startPause);
resetButton.addEventListener("click", resetWatch);
lapButton.addEventListener("click", showLapModal);
closeModal.addEventListener("click", hideLapModal);
saveLapButton.addEventListener("click", saveLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 10); // Update every 10ms for precise interval
        running = true;
        startPauseButton.textContent = "Pause";
        lapButton.disabled = false;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startPauseButton.textContent = "Resume";
        lapButton.disabled = true;
    }
}

function resetWatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00.00";
    startPauseButton.textContent = "Start";
    lapsContainer.innerHTML = "";
    lapCounter = 0;
    totalLaps = [];
}

function showLapModal() {
    if (!running) return;
    
    // Capture current lap time
    currentLapTime = new Date().getTime() - startTime;
    lapModal.style.display = "block"; // Show the modal
}

function hideLapModal() {
    lapModal.style.display = "none"; // Hide the modal
}

function saveLap() {
    const lapName = lapLabelInput.value.trim();
    if (!lapName) {
        alert("Please enter a name or task for the lap!");
        return;
    }

    lapCounter++;
    totalLaps.push({ name: lapName, time: currentLapTime });

    const lapElement = document.createElement("li");
    lapElement.textContent = `${lapName} - Lap ${lapCounter}: ${formatTime(currentLapTime)}`;
    lapsContainer.appendChild(lapElement);

    lapLabelInput.value = ""; // Clear the input after saving the lap
    hideLapModal(); // Hide the modal after saving
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10); // For two-digit milliseconds display

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}
