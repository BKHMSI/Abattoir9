import textrazor
import sent_similarity
from aws import Rekognition, TTS


class QnA():
	def __init__(self):
		textrazor.api_key='051179e2e9b09df0a0f6a32fa2967db64f35d4bbec83ad31c635571b'
		self.client = textrazor.TextRazor(extractors=["words", "entities", "entailments", "relations"])
	
	def input(self, text):
		self.response = self.client.analyze(text)

	def getComponents(self):
		questions, answers = [], []
		for r in self.response.relations():
			relation = [rp.param_words for rp in r.params]
			subject  = ' '.join(subject.token for subject in relation[0])
			objects  = ' '.join(objects.token for objects in relation[1])
			predicts = ' '.join(predict.token for predict in r.predicate_words)
			lemmas   = ' '.join(predict.lemma for predict in r.predicate_words)

			questions += ["Who {} {}?".format(predicts, objects)]
			answers   += [subject]
			questions += ["What {} {}?".format(subject, predicts)]
			answers   += [objects]

		return questions, answers



########### INIT #########
# qna = QnA()
# rek = Rekognition('rekoginition-book-reader')
# tts = TTS()
# image_path = 'final-web/the-magic-book/18.jpeg'

# detected = rek.get_text(image_path)
# detected = [det for det in detected if len(det.split(" ")) > 1]
# texts = ' '.join(detected)
# texts = texts.split('.')

# text_so_far = ""
# for text in detected:
# 	if len(text.split(' ')) > 1:
# 		text_so_far += " "+text
# 		if text.find('.') != -1:
# 			texts += [text_so_far]
# 			text_so_far = ""

texts = ["Great Answer!", "You're Close!", ""]
print(texts)
for i, text in enumerate(texts):
	tts.synthSpeech(text)
	tts.saveSound("{}_{}".format("result", i))

# for text in texts:
# 	if len(text.split(' ')) > 1:
# 		qna.input(text)
# 		qs, ans = qna.getComponents()
# 		for i, q in enumerate(qs):
# 			print("{} --> {}".format(q, ans[i]))