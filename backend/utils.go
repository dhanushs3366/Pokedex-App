package backend

import (
	"encoding/json"
	"errors"
	"math/rand"
	"os"
	"time"
)

type PokemonDescription struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

const JSON_PATH = "frontend/src/assets/pokemons/pokemon.json"

func loadPokemons(filePath string) ([]PokemonDescription, error) {
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	var pokemons []PokemonDescription
	err = json.Unmarshal(fileData, &pokemons)
	if err != nil {
		return nil, err
	}
	return pokemons, nil
}

func GetPokemonDescription(pokemonName string) (string, error) {
	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return "", err
	}

	for i := 0; i < len(pokemons); i++ {
		if pokemons[i].Name == pokemonName {
			return pokemons[i].Description, nil
		}
	}
	return "", errors.New("provided pokemon is not in the json")
}

func GetPokemonId(pokemonName string) (int, error) {
	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return -1, err
	}

	for i := 0; i < len(pokemons); i++ {
		if pokemons[i].Name == pokemonName {
			id := pokemons[i].Id
			return id, nil
		}
	}
	return -1, errors.New("provided pokemon is not in the json")
}

func GetPokemonName(id int) (string, error) {
	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return "", err
	}

	for i := 0; i < len(pokemons); i++ {
		pokemon := pokemons[i]
		if pokemon.Id == id {
			return pokemon.Name, nil
		}
	}
	return "", errors.New("provided pokemon is not in the json")
}

func GetOptions(correctId int) ([]string, error) {
	pokemonName, err := GetPokemonName(correctId)
	if err != nil {
		return nil, err
	}

	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return nil, err
	}

	var filteredPokemons []PokemonDescription
	for _, pokemon := range pokemons {
		if pokemon.Id != correctId {
			filteredPokemons = append(filteredPokemons, pokemon)
		}
	}
	randSource := rand.NewSource(time.Now().UnixNano())
	r := rand.New(randSource)

	r.Shuffle(len(filteredPokemons), func(i, j int) {
		filteredPokemons[i], filteredPokemons[j] = filteredPokemons[j], filteredPokemons[i]
	})

	var options [3]string
	options[0] = pokemonName
	for i := 1; i < 3; i++ {
		options[i] = filteredPokemons[i-1].Name
	}

	r.Shuffle(len(options), func(i, j int) {
		options[i], options[j] = options[j], options[i]
	})

	return options[:], nil
}
