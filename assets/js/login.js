const formulaire = document.querySelector("form");
formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  loginAuth();
});

function loginAuth() {
  const messageErreur = document.querySelector("#erreur-motdepasse");

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur d'authentification");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("token", data.token); // Stocke le token dans le local storage
      window.location.href = "index.html"; // Redirige l'utilisateur vers la page d'accueil
    })
    .catch((error) => {
      console.error("Erreur :", error);
      messageErreur.textContent = "E-mail ou mot de passe incorrect";
      messageErreur.style.color = "red";
    });
}
