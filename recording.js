let mediaRecorder;
let chunks = [];
let audioURL;

// import sendMP3 file
const sendMP3 = require("./sendMP3")

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

function handleFile() {
  const fileInput = document.getElementById('fileInput');
  sendMP3(fileInput)
}