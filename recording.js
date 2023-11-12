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

<<<<<<< HEAD
          // You can also handle the blob in other ways, e.g., sending it to a server
=======
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
>>>>>>> d198db6ee67a403114fecee67249af38078acda7
        })
        .catch(error => {
          console.error('Error in recording:', error);
        });
      recordButton.textContent = 'Stop Recording';
    }
  });

<<<<<<< HEAD
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
=======
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
  if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
          // The content of the file is stored in e.target.result
          const fileContent = e.target.result;

          // You can now use the file content as needed
          console.log('File Content:', fileContent);
      };

      // Read the file as text
      reader.readAsText(selectedFile);
  } else {
      console.error('No file selected.');
  }
}
>>>>>>> d198db6ee67a403114fecee67249af38078acda7
