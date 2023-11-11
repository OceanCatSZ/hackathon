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
      startRecording()
        .then(blob => {
          // Use the blob here, e.g., assign it to the audio element
          const audioURL = URL.createObjectURL(blob);
          audioElement.src = audioURL;

          // You can also handle the blob in other ways, e.g., sending it to a server
        })
        .catch(error => {
          console.error('Error in recording:', error);
        });
      recordButton.textContent = 'Stop Recording';
    }
  });

  function startRecording() {
    return new Promise((resolve, reject) => {
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
            resolve(blob);
          };
          mediaRecorder.onerror = (event) => {
            reject(event.error);
          };
          mediaRecorder.start();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
});