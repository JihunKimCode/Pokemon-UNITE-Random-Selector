import requests
from bs4 import BeautifulSoup

url = "https://unite.pokemon.com/en-us/pokemon/"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

characters = []

# Find all <a> tags with class 'pokemon-card'
for a in soup.select("a.pokemon-card"):
    name = a.get("data-track-name-value", "unknown").lower()
    type_role = a.get("data-pokemon-battle-type", "unknown").lower()
    
    characters.append({
        "name": name,
        "type": type_role,
        "enabled": True
    })

# Write to a JS file
with open("pokemon.js", "w", encoding="utf-8") as f:
    f.write("const characters = [\n")
    for c in characters:
        f.write(f'  {{ name: "{c["name"]}", type: "{c["type"]}", enabled: true }},\n')
    f.write("];")

print("pokemon.js file updated successfully!")
