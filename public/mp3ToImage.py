import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import io
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

def returnImage(recordingFile):
    filename = 'Recordings\\a1_FV1_MP3.mp3'
    y, sr = librosa.load(filename)

    # trim silent edges
    # input_tone, _ = librosa.effects.trim(y)
    # librosa.display.waveshow(input_tone, sr=sr)
    hop_length = 512
    n_mels = 128
    n_fft = 2048
    mel = librosa.filters.mel(sr=sr, n_fft=n_fft, n_mels=n_mels)

    S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=n_mels)
    S_DB = librosa.power_to_db(S, ref=np.max)

    fig, ax = plt.subplots()
    img = librosa.display.specshow(S_DB, sr=sr, hop_length=hop_length, x_axis='time', y_axis='mel')
    ax.set_axis_off()
    plt.ylim(50, 350)
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0)
    buf.seek(0)
    im = Image.open(buf)

    # Optionally resize
    # im = im.resize((225, 225))

    buf.close()
    return im
    
