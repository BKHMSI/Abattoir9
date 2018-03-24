import json
import boto3

class AWS:
    def __init__(self, client, bucket = ""):
        self.client = boto3.client(client)
        self.bucket = bucket

class TTS(AWS):
    def __init__(self):
        super(TTS, self).__init__('polly')
        self.response = ''

    def synthSpeech(self, text):
        self.response = self.client.synthesize_speech(OutputFormat='mp3',
                                        Text=text,
                                        VoiceId='Justin')
    def _getSound(self):
        self.sound = self.response['AudioStream'].read()

    def saveSound(self, path):
        self._getSound()
        soundFile = open(path + '.mp3', 'wb')
        soundFile.write(self.sound)
        soundFile.close()

class Comprehend(AWS):

    def __init__(self):
        super(Comprehend, self).__init__('comprehend')

    def get_language(self, text):
        response =  self.client.detect_dominant_language(Text=text)
        return response["Languages"][0]["LanguageCode"]

    def get_entities(self, text):
        response =  self.client.detect_entities(Text=text, LanguageCode="en")
        return response["Entities"]

    def get_keyphrases(self, text):
        response = self.client.detect_key_phrases(Text=text, LanguageCode="en")
        return response["KeyPhrases"]

    def get_sentiment(self, text):
        response = self.client.detect_sentiment(Text=text, LanguageCode="en")
        return response["Sentiment"]
    

class Rekognition(AWS):
    def __init__(self, bucket):
        super(Rekognition, self).__init__('rekognition', bucket)

    def get_text(self, image_path):
        with open(image_path, "rb") as file:
            blob = bytearray(file.read())
        response = self.client.detect_text(Image = {'Bytes': blob})
        print('Detected labels for ' + image_path)  
        detected = [res["DetectedText"] for res in response["TextDetections"]]
        return detected 