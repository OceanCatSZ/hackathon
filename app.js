// audio with pause function
var myAudio = new Audio("Recordings\\a1_FV1_MP3.mp3");
var isPlaying = false;

function togglePlay() {
  myAudio.play();
  //  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};
// ends here
//unshul

// Catherine Ryu, Mandarin Tone Perception & Production Team, and Michigan State University Libraries. "mā by FV1." Tone Perfect: Multimodal Database for Mandarin Chinese. Accessed 1 January 2022. https://tone.lib.msu.edu/tone/1187

function callPython() {
  fetch("http://localhost:5000/hello")
  .then(response => response.text())
  .then(data => {
    const responseDiv = document.getElementById('response')
    responseDiv.innerHTML = data.message;
  })
}