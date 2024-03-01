import { galleryGetData } from "./galleries";

export function soumettreFormulaire() {
  const formulaire = document.getElementById("formulaire-popup");
  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    const fichier = document.getElementById("monFichier").files[0];
    const titre = document.getElementById("title").value;
    const categorie = document.querySelector(".maListe").value;

    const formData = new FormData();
    formData.append("image", fichier.files[0]); // Ajoute le fichier image
    formData.append("title", titre.value); // Ajoute le titre
    formData.append("category", categorie.value); // Ajoute la catégorie

    // Envoie les données du formulaire à l'API
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        galleryGetData(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
}
