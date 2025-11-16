// Your script here.
// Function to populate available voices
function populateVoices() {
    voices = speechSynthesis.getVoices(); // Get all voices
    voicesDropdown.innerHTML = ''; // Clear existing options
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voicesDropdown.appendChild(option);
    });
}

// Initial population
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

// Function to set options from inputs
function setOptions() {
    msg.text = document.querySelector('[name="text"]').value;
    msg.rate = document.querySelector('[name="rate"]').value;
    msg.pitch = document.querySelector('[name="pitch"]').value;
    const selectedVoiceIndex = voicesDropdown.value;
    if (voices[selectedVoiceIndex]) {
        msg.voice = voices[selectedVoiceIndex];
    }
}

// Speak button
speakButton.addEventListener('click', () => {
    if (!document.querySelector('[name="text"]').value.trim()) {
        alert("Please enter text to speak!");
        return;
    }
    speechSynthesis.cancel(); // Stop any ongoing speech
    setOptions();
    speechSynthesis.speak(msg);
});

// Stop button
stopButton.addEventListener('click', () => {
    speechSynthesis.cancel();
});

// Update speech dynamically when voice, rate, or pitch changes
voicesDropdown.addEventListener('change', () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        setOptions();
        speechSynthesis.speak(msg);
    }
});

options.forEach(option => {
    option.addEventListener('input', () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setOptions();
            speechSynthesis.speak(msg);
        }
    });
});
