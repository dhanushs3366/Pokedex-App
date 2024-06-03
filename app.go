package main

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"image"
	"image/png"
	"os"
	"os/exec"
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

//on shutdown remove the pokemon.png

// on startup check if venv is created and if not create it and source it using a bash script
