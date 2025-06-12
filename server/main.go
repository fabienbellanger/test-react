package main

import (
	"encoding/json"
	"log"
	"net/http"
)

const (
	Username = "admin"
	Password = "admin"
	Token    = "mySecuredAccessToken"
)

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type TokenResponse struct {
	Username string `json:"username"`
	Token    string `json:"token"`
}

func tokenHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Payload invalide", http.StatusBadRequest)
		return
	}

	if creds.Username == Username && creds.Password == Password {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(TokenResponse{Token: Token, Username: creds.Username})
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
}

func adminHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	token := r.Header.Get("Authorization")
	if token != "Bearer "+Token {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	w.Write([]byte("Welcome to admin zone!"))
}

func main() {
	http.HandleFunc("/token", tokenHandler)
	http.HandleFunc("/admin", adminHandler)

	log.Println("Server started and listening on localhost:4444...")
	log.Fatal(http.ListenAndServe(":4444", nil))
}
