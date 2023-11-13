// audio with pause function
var myAudio = new Audio("Recordings\\a1_FV1_MP3.mp3");
var isPlaying = false;

function togglePlay() {
  myAudio.play();
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

document.addEventListener("DOMContentLoaded", function() {
  const numbers = [1, 2, 3, 4, 5, 6];
  let currentIndex = 0;

  const numberDisplay = document.getElementById("numberDisplay");

  numberDisplay.addEventListener("click", function() {
      numberDisplay.textContent = numbers[currentIndex];
      currentIndex = (currentIndex + 1) % numbers.length;
  });
});