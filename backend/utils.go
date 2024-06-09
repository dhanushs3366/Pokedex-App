package backend

import (
	"encoding/json"
	"errors"
	"os"
)

type PokemonDescription struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

const JSON_PATH = "frontend/src/assets/pokemons/pokemon.json"

func GetPokemonDescription(pokemonName string) (string, error) {
	data, err := os.ReadFile(JSON_PATH)
	if err != nil {
		return "", err
	}

	var pokemons []PokemonDescription
	err = json.Unmarshal(data, &pokemons)

	if err != nil {
		return "", err
	}

	for i := 0; i < len(pokemons); i++ {
		if pokemons[i].Name == pokemonName {
			return pokemons[i].Description, nil
		}
	}
	return "", errors.New("provided pokemon is not in the description")
}
