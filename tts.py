import boto3

class TTS:
    def __init__(self):
        self.polly = boto3.client('polly')
        self.response = ''

    def synthSpeech(self, text):
        self.response = self.polly.synthesize_speech(OutputFormat='mp3',
                                        Text=text,
                                        VoiceId='Justin')
    def _getSound(self):
        self.sound = self.response['AudioStream'].read()

    def saveSound(self, path):
        self._getSound()
        soundFile = open(path + '.mp3', 'wb')
        soundFile.write(self.sound)
        soundFile.close()
