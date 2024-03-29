from vosk import Model, KaldiRecognizer
import pyaudio
import json
import requests

# Load the Vosk model
model = Model("vosk-us")
API_ENDPOINT = "http://localhost:3000/query"
headers = {'Content-Type': 'application/json'}

# Create a recognizer using the model
rec = KaldiRecognizer(model, 16000)

# Create a PyAudio instance
p = pyaudio.PyAudio()

# Open the microphone for recording
stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8000)
stream.start_stream()

# Loop through the audio stream
while True:
   data = stream.read(4000)

   if rec.AcceptWaveform(data):
        result = json.loads(rec.Result())
        print(result)
        if "listen" in result["text"]:
            print("listening for a command")
            while True:
                data = stream.read(4000)
                if rec.AcceptWaveform(data):
                    result = json.loads(rec.Result())

                    if result["text"] == "cancel":
                        print("command canceled")
                        break;

                    if result["text"] != "":

                        print(f"Transcription: {result}")

                        data = {
                            "query": result["text"]
                        }
                        json_object = json.dumps(data)
                        print(json_object)
                        r = requests.post(url=API_ENDPOINT, data=json_object, headers=headers)
                        res = r.text
                        
                        print(f"response: {res}")
                        break
        elif "close" in result["text"]: 
            break;
   
# Stop the stream and close the PyAudio instance
stream.stop_stream()
stream.close()
p.terminate()