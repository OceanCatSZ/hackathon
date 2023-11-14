// audio with pause function
var myAudio = new Audio("Recordings\\a1_FV1_MP3.mp3");
var isPlaying = false;

function togglePlay() {
  myAudio.play();
  // isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};
