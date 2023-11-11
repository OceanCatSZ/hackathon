from flask import Flask, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        # Process the file here (e.g., save it or analyze it)
        process_mp3_file(file)
        print("hello")
        file.save(file.filename)
        return 'File successfully uploaded', 200

def process_mp3_file(mp3_file):
    print("Hello world")
    # Process the MP3 file
    # Example: print file name
    print(f"Processing file: {mp3_file.filename}")
if __name__ == '__main__':
    app.run(debug=True, port=5000)