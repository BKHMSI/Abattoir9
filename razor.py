import textrazor
class QnA():
	def __init__(self):
		textrazor.api_key='051179e2e9b09df0a0f6a32fa2967db64f35d4bbec83ad31c635571b'
		self.client = textrazor.TextRazor(extractors=["words", "entities", "entailments", "relations"])
		client.set_cleanup_mode("cleanHTML")
	
	def input(self,text):
		self.response = self.client.analyze(input_text)

	def getComponents(self):
		for r in self.response.relations():
	        print(r.params[0].relation)
	        print(r.params)
	        predi = r.predicate_words[0].token
	        lemma = r.predicate_words[0].lemma



	def getQuestion(self):



