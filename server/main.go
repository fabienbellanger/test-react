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
	Lastname  string `json:"lastname"`
	Firstname string `json:"firstname"`
	Username  string `json:"username"`
	Token     string `json:"token"`
}

// To test: http post localhost:4444/token username=admin password=admin
func tokenHandler(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid Payload", http.StatusBadRequest)
		return
	}

	if creds.Username == Username && creds.Password == Password {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(TokenResponse{
			Lastname:  "Doe",
			Firstname: "John",
			Token:     Token,
			Username:  creds.Username,
		})
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
}

// To test: http get localhost:4444/admin -A bearer -a mySecuredAccessToken
func adminHandler(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	if token != "Bearer "+Token {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	w.Write([]byte("Welcome to admin zone!"))
}

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /token", tokenHandler)
	mux.HandleFunc("GET /admin", adminHandler)

	app := CORSMiddleware(mux)

	log.Println("Server started and listening on localhost:4444...")
	log.Fatal(http.ListenAndServe(":4444", app))
}
