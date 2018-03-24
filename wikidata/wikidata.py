#!/usr/bin/python3
import pywikibot

class WikiData:
    def __init__(self):
        self.site = pywikibot.Site("en", "wikipedia")
        self.repo = self.site.data_repository()  


class Item(WikiData):
    def __init__(self, x, code=False):
        super(Item, self).__init__()
        if not code:
            page = pywikibot.Page(self.site, x)
            item = pywikibot.ItemPage.fromPage(page)
        else:
            item = pywikibot.ItemPage(self.repo, x)
        self.item = item.get()
        print(self.item)

    def get_name(self):
        return self.item['labels']['en']
    
    def __str__(self):
        return "Description: {}".format(self.item["descriptions"]["en"])

data = Item('')

print(data)

