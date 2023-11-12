from flask import Flask, jsonify
import base64


app = Flask(__name__)

@app.route('/get_image')
def get_image():
    image_base64 = convert_image_to_base64('path_to_your_image.jpg')  # Replace with your image path
    return jsonify({'image': image_base64})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

def convert_image_to_base64(filepath):
    with open(filepath, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

