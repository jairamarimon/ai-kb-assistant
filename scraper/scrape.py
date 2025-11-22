import requests
from bs4 import BeautifulSoup
import json

URLS = {
 "Alaska": "https://www.shermanstravel.com/cruise-destinations/alaska-itineraries",
 "Caribbean & Bahamas": "https://www.shermanstravel.com/cruise-destinations/caribbean-and-bahamas",
 "Hawaiian Islands": "https://www.shermanstravel.com/cruise-destinations/hawaiian-islands",
 "Northern Europe": "https://www.shermanstravel.com/cruise-destinations/northern-europe",
}

result = []

for label, url in URLS.items():
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    text = soup.get_text(" ", strip=True)
    result.append({"url": url, "label": label, "text": text})

print(json.dumps(result))
