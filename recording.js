document.addEventListener('DOMContentLoaded', function () {
    let mediaRecorder;
    let chunks = [];
  
    const recordButton = document.getElementById('recordButton');
    const audioElement = document.getElementById('audioElement');
  
    recordButton.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        // Stop recording
        mediaRecorder.stop();
        recordButton.textContent = 'Start Recording';
      } else {
        // Start recording
        startRecording();
        recordButton.textContent = 'Stop Recording';
      }
    });
  
    function startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audioElement.src = audioURL;
            const spawn = require("child_process").spawn;
            arg1 = blob;
            const pythonProcess = spawn('python',["specPlotter.py", arg1]);
            // Create a download link
            // const downloadLink = document.createElement('a');
            // downloadLink.href = audioURL;
            // downloadLink.download = 'recorded_audio.wav';
            // document.body.appendChild(downloadLink);
            // downloadLink.click();
            // document.body.removeChild(downloadLink);
          };
          mediaRecorder.start();
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    }
  });