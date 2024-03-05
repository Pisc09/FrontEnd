import { works, galleryGetData } from "./galleries.js";

// const formulaire = document.getElementById("formulaire-popup");

const fichier = document.getElementById("monFichier");
const titre = document.getElementById("title");
const categorie = document.querySelector(".maListe");

const btnValider = document.getElementById("Valider");
btnValider.classList.add("disabled");
console.log(btnValider);

// formulaire.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   soumettreFormulaire();
// });

export async function soumettreFormulaire() {
  const formData = new FormData();
  formData.append("image", fichier.files[0]);
  formData.append("title", titre.value);
  formData.append("category", categorie.value);

  try {
    // Récupérez le jeton du local storage
    const token = window.localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok)
      throw new Error(`Erreur HTTP! statut: ${response.status}`);

    const data = await response.json();
    console.log(data);

    // Ajoutez le nouvel élément à la galerie
    works.push(data);
    galleryGetData();
  } catch (error) {
    console.error("Error :", error);
  }
}

export function btnDisabled() {
  if (
    fichier.files.length > 0 &&
    titre.value.trim() !== "" &&
    categorie.value !== "0"
  ) {
    btnValider.disabled = false;
    btnValider.classList.remove("disabled");
  } else {
    btnValider.disabled = true;
    btnValider.classList.add("disabled");
  }
}

fichier.addEventListener("change", btnDisabled);
titre.addEventListener("input", btnDisabled);
categorie.addEventListener("change", btnDisabled);
