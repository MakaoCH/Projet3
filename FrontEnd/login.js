

// récupération des éléments du formulaire
const form = document.getElementById("connexion");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

// gestionnaire d'événement pour le formulaire de connexion
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // envoi des données de connexion à l'API
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Connexion échouée");
    }
    const data = await response.json();
    console.log("Connexion réussie", data);
    window.location.href = "index.html";
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});