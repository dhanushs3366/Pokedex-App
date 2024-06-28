import requests
import json

# Load the existing JSON data
with open('pokemon.json', 'r') as f:
    pokemon_data = json.load(f)

def fetch_abilities(pokemon_id):
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_id}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        abilities = [ability['ability']['name'] for ability in data['abilities']]
        return abilities
    else:
        print(f"Failed to fetch data for Pokemon ID {pokemon_id}")
        return []

# Iterate through the existing JSON data and update with abilities
for pokemon in pokemon_data:
    pokemon_id = pokemon['id']
    abilities = fetch_abilities(pokemon_id)
    pokemon['abilities'] = abilities
    print(f"Updated abilities for {pokemon['name']}")

# Write the updated JSON data to a file
with open('updated_pokemon.json', 'w') as f:
    json.dump(pokemon_data, f, indent=2)

print("Updated JSON data with abilities and saved to 'updated_pokemon.json'")
