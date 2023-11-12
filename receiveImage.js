fetch('http://localhost:5000/get_image')
    .then(response => response.json())
    .then(data => {
        const imageBase64 = data.image;
        document.getElementById('displayedImage').src = `data:image/jpeg;base64,${imageBase64}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });