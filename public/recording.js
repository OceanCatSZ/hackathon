let mediaRecorder;
let chunks = [];

// import sendMP3 file
// const sendMP3 = require("./sendMP3")
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
function toggleRecording() {
    const recordButton = document.getElementById('recordButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const downloadButton = document.getElementById('downloadButton');

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        // Stop recording
        mediaRecorder.stop();
        recordButton.textContent = 'Start Recording';
        downloadButton.disabled = false;
    } else {
        // Start recording with a fresh chunks array
        chunks = [];
        startRecording();
        recordButton.textContent = 'Stop Recording';
        downloadButton.disabled = true;
    }
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);

                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = audioUrl;
            };

            mediaRecorder.start();
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });
}

function downloadRecording() {
    const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(audioBlob);
    downloadLink.download = 'recorded_audio.mp3';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function uploadFile() {
    const fileInput = document.getElementById('mp3File');

    const file = fileInput.files[0];
    if (!file) {
        console.log("Not a file");
        alert("Please select an MP3 file.");
        return;
    }

    const formData = new FormData();
    formData.append('mp3', file);
    console.log("Processing");

    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Trying");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
    })
    .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById('resultImage').src = imageUrl;
        document.getElementById('resultImage').style.display = 'block';
    })
    .catch(e => {
        togglePlay();
        console.error('Upload failed:', e);
    });
}

function testServerConnection() {
    fetch('http://127.0.0.1:5000/upload')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => alert(text))
    .catch(error => console.error('Error testing connection:', error));
}