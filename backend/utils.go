package backend

import (
	"encoding/json"
	"errors"
	"log"
	"math/rand"
	"os"
	"os/exec"
	"time"
)

type PokemonDescription struct {
	ID          int            `json:"id"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Types       []string       `json:"types"`
	Base        Base           `json:"base"`
	Profile     PokemonProfile `json:"profile"`
}

type Base struct {
	HP        int `json:"HP"`
	Attack    int `json:"Attack"`
	Defense   int `json:"Defense"`
	SpAttack  int `json:"Sp. Attack"`
	SpDefense int `json:"Sp. Defense"`
	Speed     int `json:"Speed"`
}

type PokemonProfile struct {
	Height      string     `json:"height"`
	Weight      string     `json:"weight"`
	Egg         []string   `json:"egg"`
	Abilities   [][]string `json:"ability"`
	GenderRatio string     `json:"gender"`
}

const JSON_PATH = "frontend/src/assets/pokemons/pokemon.json"
const TTS_WAV_PATH = "frontend/src/assets/pokemons/output.wav"

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
			ID := pokemons[i].ID
			return ID, nil
		}
	}
	return -1, errors.New("provided pokemon is not in the json")
}

func GetPokemonName(pokemonID int) (string, error) {
	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return "", err
	}

	for i := 0; i < len(pokemons); i++ {
		pokemon := pokemons[i]
		if pokemon.ID == pokemonID {
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
		if pokemon.ID != correctId {
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

func PlayTTS() error {
	cmd := exec.Command("gst-launch-1.0", "filesrc", "location="+TTS_WAV_PATH, "!", "wavparse", "!", "audioconvert", "!", "autoaudiosink")
	if err := cmd.Run(); err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}

func GetPokemonTypes(pokemonID int) ([]string, error) {
	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return nil, err
	}
	for _, pokemon := range pokemons {
		if pokemon.ID == pokemonID {
			return pokemon.Types, nil
		}
	}
	return nil, errors.New("pokemon is not found")
}

func GetPokemonDetails(pokemonID int) (PokemonDescription, error) {
	pokemons, err := loadPokemons(JSON_PATH)
	if err != nil {
		return PokemonDescription{}, err
	}
	for _, pokemon := range pokemons {
		if pokemon.ID == pokemonID {
			return pokemon, nil
		}
	}
	return PokemonDescription{}, errors.New("pokemon not found")
}
