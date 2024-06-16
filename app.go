package main

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"image"
	"image/png"
	"net/http"
	"os"
	"os/exec"
	"pokedex/backend"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	// call setup.sh in frontend/src/py
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetPokemonImage(byteArr []byte) string {
	img, _, err := image.Decode(bytes.NewReader(byteArr))
	if err != nil {
		return "you found the error p1"
	}
	out, _ := os.Create("frontend/src/assets/images/pokemons/pokemon.png")

	defer out.Close()

	err = png.Encode(out, img)
	if err != nil {
		return "error"
	}

	return "pokemon.png"

}

func (a *App) GetPokemonName(pokemonId int, pokemonDetails string) string {
	file, err := os.Open(pokemonDetails)
	if err != nil {
		return err.Error()
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var index = 0
	var pokemon string
	for scanner.Scan() {
		index++
		if index == pokemonId {
			pokemon = scanner.Text()
		}
	}
	if err := scanner.Err(); err != nil {
		return err.Error()
	}
	return pokemon

}

func (a *App) TakePic() string {

	cmd := exec.Command("fswebcam", "--no-banner", "frontend/src/assets/images/camera-feed/pokemon.jpg")
	output, err := cmd.CombinedOutput()
	if err != nil {
		return err.Error()

	}
	return string(output)
}

func (a *App) TTS(pokemonName string) bool {
	client := &backend.Api{Client: &http.Client{}}

	text, err := backend.GetPokemonDescription(pokemonName)
	if err != nil {
		return false
	}

	err = client.GetPokedexVoice(text)
	return err == nil
}

func (a *App) GetPokemonNameForGuess(id int) string {
	pokemonName, err := backend.GetPokemonName(id)
	if err != nil {
		return err.Error()
	}
	return pokemonName
}

func (a *App) GetPokemonId(pokemonName string) int {
	pokemonId, err := backend.GetPokemonId(pokemonName)
	if err != nil {
		return -1
	}
	return pokemonId
}

func (a *App) GetOptions(correctId int) []string {
	options, err := backend.GetOptions(correctId)
	if err != nil {
		return nil
	}
	return options
}

func (a *App) PlayTTS() string {
	err := backend.PlayTTS()
	if err != nil {
		return err.Error()
	}
	return ""
}

//on shutdown remove the pokemon.png

// on startup check if venv is created and if not create it and source it using a bash script
