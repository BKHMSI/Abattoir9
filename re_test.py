#relation extraction test

import textrazor

textrazor.api_key = "91a94d86c43d68664ee98f06132eed6fa4da3e6d46a8988df4dd7d8e"

input_text = "Barclays misled shareholders and the public about one of the biggest investments in the bank's history, a BBC investigation has found."

other_text = "One day, when Bhaiya is not at home, Rinky looks for his pen. She slides open her drawer"

client = textrazor.TextRazor(extractors=["relations"])
response = client.analyze(other_text)

for relation in response.relations():
    print(relation.params)

