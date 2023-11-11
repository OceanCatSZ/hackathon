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

            result = chunks.map(x => x)

            const variableToSend = result;
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audioElement.src = audioURL;

            fetch('/draw_graph', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: variableToSend }),
            })
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('result');
                resultDiv.textContent = `Result from Python: ${data.result}`;
            })
            .catch(error => {
                console.error('Error sending data to Python:', error);
            });
            // const spawn = require("child_process").spawn;
            // arg1 = result;
            // const pythonProcess = spawn('python',["specPlotter.py", arg1]);
          };
          mediaRecorder.start();
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    }
  });