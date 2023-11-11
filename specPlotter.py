# https://parselmouth.readthedocs.io/en/stable/examples/plotting.html
# https://www.digitalocean.com/community/tutorials/how-to-create-your-first-web-application-using-flask-and-python-3
from flask import Flask
from flask import json
from flask import jsonify
from flask import Flask, send_file
from flask import request, jsonify

app = Flask(__name__)

import parselmouth
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import json
import sys

print("Hello from beginning")

@app.route('/process_variable', methods=['POST'])
def process_variable():
    data_from_js = request.json.get('data')

    # Your Python logic here
    result = draw_graph(data_from_js)

    return jsonify({'result': result})


def draw_graph(data):
    # From recordings.js, spawns a python process in the form "python specPlotter.py
    sns.set() # Use seaborn's default style to make attractive graphs
    plt.rcParams['figure.dpi'] = 100 # Show nicely large images in this notebook
    snd = parselmouth.Sound(data)
    # snd is now a Parselmouth Sound object, and we can access its values and other properties to plot them with the common matplotlib Python library:
    def draw_spectrogram(spectrogram, dynamic_range=70):
        X, Y = spectrogram.x_grid(), spectrogram.y_grid()
        sg_db = 10 * np.log10(spectrogram.values)
        plt.pcolormesh(X, Y, sg_db, vmin=sg_db.max() - dynamic_range, cmap='afmhot')
        plt.ylim([spectrogram.ymin, spectrogram.ymax])
        plt.xlabel("time [s]")
        plt.ylabel("frequency [Hz]")

    def draw_intensity(intensity):
        plt.plot(intensity.xs(), intensity.values.T, linewidth=3, color='w')
        plt.plot(intensity.xs(), intensity.values.T, linewidth=1)
        plt.grid(False)
        plt.ylim(0)
        plt.ylabel("intensity [dB]")

    intensity = snd.to_intensity()
    spectrogram = snd.to_spectrogram()
    returnImage = plt.figure()
    draw_spectrogram(spectrogram)
    plt.twinx()
    draw_intensity(intensity)
    plt.xlim([snd.xmin, snd.xmax])
    # plt.savefig('filename.png')
    plt.show()
    plt.close()
    
    
    
    return returnImage

draw_graph()

if __name__ == '__main__':
    app.run(debug=True)