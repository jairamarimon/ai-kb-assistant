import asyncio
import aiohttp
from bs4 import BeautifulSoup
import json

URLS = {
 "Alaska": "https://www.shermanstravel.com/cruise-destinations/alaska-itineraries",
 "Caribbean & Bahamas": "https://www.shermanstravel.com/cruise-destinations/caribbean-and-bahamas",
 "Hawaiian Islands": "https://www.shermanstravel.com/cruise-destinations/hawaiian-islands",
 "Northern Europe": "https://www.shermanstravel.com/cruise-destinations/northern-europe",
}

async def fetch(session, url):
    """Fetch a single URL and return its HTML text."""
    async with session.get(url) as response:
        return await response.text()

async def scrape_page(session, label, url):
    """Fetch and parse a page concurrently."""
    html = await fetch(session, url)
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text(" ", strip=True)
    return {"url": url, "label": label, "text": text}

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [scrape_page(session, label, url) for label, url in URLS.items()]
        results = await asyncio.gather(*tasks)  # Run all tasks concurrently
        print(json.dumps(results))

if __name__ == "__main__":
    asyncio.run(main())
