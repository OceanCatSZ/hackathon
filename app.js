// audio with pause function
var myAudio = new Audio("sound_filename.mp3");
var isPlaying = false;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};
// ends here



function displayRandomNumber() { //Testing function for website
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    document.getElementById('randomNumberDisplay').innerText = 'Random Number: ' + randomNumber;
}

// Event listener for the 'Start Learning Now' button
document.getElementById('startLearningButton').addEventListener('click', displayRandomNumber);

// Event listener for the 'Start Learning' tab
document.getElementById('startLearningTab').addEventListener('click', function () {
    // Clear existing content
    document.querySelector('.hero__heading').innerText = '';
    document.querySelector('.hero__description').innerText = '';

    // Update with new content for 'Start Learning'
    document.querySelector('.hero__heading').innerText = 'Start Learning';
    document.querySelector('.hero__description').innerText = 'Welcome to the learning page!';

    // Call the function to display a random number
    displayRandomNumber();
});