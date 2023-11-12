const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
const filePath = 'sound_filename.mp3'; // Replace with the path to your MP3 file

form.append('file', fs.createReadStream(filePath));

axios.post('http://localhost:5000/upload', form, {
  headers: form.getHeaders(),
})
.then((response) => {
  console.log('File uploaded successfully', response.data);
})
.catch((error) => {
  console.error('Error uploading file', error);
});