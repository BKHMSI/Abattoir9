import json
import boto3

class AWS:
    def __init__(self, client, bucket = ""):
        self.client = boto3.client(client)
        self.bucket = bucket

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

    def get_labels(self, image_path):
        with open(image_path, "rb") as file:
            blob = bytearray(file.read())
        response = self.client.detect_text(Image = {'Bytes': blob})
        print('Detected labels for ' + image_path)  
        print(response["TextDetections"][0]["DetectedText"])  
        

if __name__ == "__main__":
    rek = Rekognition('rekoginition-book-reader')
    rek.get_labels('the-magic-book/3.jpeg')

    # comprehend = Comprehend()
    # def get_entities(text):
    #     entities = aws.get_entities(text)
    #     return json.dumps(entities)



