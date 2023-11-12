from flask import Flask, request
import base64
from flask import Flask, jsonify
# from . import testHackathon.py

app = Flask(__name__)
print("HELLO FROM PYTHON")
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        process_mp3_file(file)
        print("hello")
        file.save(file.filename)
        return 'From Python: File successfully uploaded', 200

def process_mp3_file(mp3_file):
    print("Hello world")
    print(f"Processing file: {mp3_file.filename}")
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)