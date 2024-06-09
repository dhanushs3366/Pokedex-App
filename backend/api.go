package backend

import (
	"bufio"
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"
	"strings"
)

type Api struct {
	Client *http.Client
}

type TTSRequest struct {
	Text         string `json:"text"`
	OutputFormat string `json:"output_format"`
	Voice        string `json:"voice"`
	VoiceEngine  string `json:"voice_engine"`
	Quality      string `json:"quality"`
}

type TTSResponse struct {
	ID            string  `json:"id"`
	Progress      float64 `json:"progress"`
	Stage         string  `json:"stage"`
	URL           string  `json:"url"`
	Duration      float64 `json:"duration"`
	Size          int     `json:"size"`
	StageProgress float64 `json:"stage_progress"`
}

func (a *Api) GetPokedexVoice(text string) error {
	PLAYHT_UID := os.Getenv("PLAYHT_UID")
	PLAYHT_AUTH_KEY := os.Getenv("PLAYHT_AUTH_KEY")
	POKEDEX_VOICE_ID := os.Getenv("POKEDEX_VOICE_ID")
	url := os.Getenv("PLAYHT_URL")

	payload := &TTSRequest{
		Text:         text,
		Voice:        POKEDEX_VOICE_ID,
		OutputFormat: "wav",
		VoiceEngine:  "PlayHT2.0",
		Quality:      "high",
	}
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		return err
	}

	req.Header.Add("accept", "text/event-stream")
	req.Header.Add("content-type", "application/json")
	req.Header.Add("AUTHORIZATION", PLAYHT_AUTH_KEY)
	req.Header.Add("X-USER-ID", PLAYHT_UID)

	res, err := a.Client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	err = a.downloadWavFile(res.Body, "frontend/src/assets/pokemons")
	if err != nil {
		return err
	}
	return nil
}

func (a *Api) downloadWavFile(body io.ReadCloser, savePath string) error {
	scanner := bufio.NewScanner(body)
	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "event: completed") {
			if scanner.Scan() {
				dataLine := scanner.Text()

				if strings.HasPrefix(dataLine, "data: ") {
					data := strings.TrimPrefix(dataLine, "data: ")

					var response TTSResponse
					err := json.Unmarshal([]byte(data), &response)
					if err != nil {
						return err
					}

					if response.URL != "" {
						return a.downloadFileFromURL(response.URL, savePath)
					}
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return errors.New("no url received")
}

func (a *Api) downloadFileFromURL(fileURL string, savePath string) error {
	req, err := http.NewRequest("GET", fileURL, nil)
	if err != nil {
		return err
	}

	res, err := a.Client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return createWavFile(savePath, res.Body)
}

func createWavFile(savePath string, body io.ReadCloser) error {
	out, err := os.Create(savePath + "/output.wav")
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, body)
	if err != nil {
		return err
	}

	return nil
}
