from flask import Flask, request, send_file
from io import BytesIO
# from flask_cors import CORS 
# from mp3ToImage import returnImage
# from PIL import Image  
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/upload', methods=['GET', 'POST'])
def test_connection(): 
    print("Hello")
    return "Connection successful", 200

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)
# print("Server starting")
# @app.route('/upload', methods=['POST'])
# def handle_upload():
#     print("Received a request.")
    
#     if 'mp3' not in request.files:
#         print("No MP3 file part in the request.")
#         return "No MP3 file part", 400

#     mp3_file = request.files['mp3']

#     if mp3_file.filename == '':
#         print("No selected file.")
#         return "No selected file", 400

#     print("Processing MP3 file...")
#     image = process_mp3(mp3_file)

#     # Convert image to binary for transport
#     img_io = BytesIO()
#     image.save(img_io, 'JPEG', quality=70)
#     img_io.seek(0)

#     print("Sending back the image.")
#     return send_file(img_io, mimetype='image/jpeg')

# def process_mp3(mp3_file):
#     print(f"Generating image from {mp3_file.filename}...")
#     image = Image.new('RGB', (100, 100), color = (255, 0, 0))
#     print("Image generated.")
#     return image
