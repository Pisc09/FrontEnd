import { galleryGetData } from "./galleries.js";

export async function soumettreFormulaire() {
  const formulaire = document.getElementById("formulaire-popup");
  formulaire.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fichier = document.getElementById("monFichier").files[0];
    console.log(fichier);
    const titre = document.getElementById("title").value;
    console.log(titre);
    const categorie = document.querySelector(".maListe").value;
    console.log(categorie);

    const formData = new FormData();
    formData.append("image", fichier);
    formData.append("title", titre);
    formData.append("category", categorie);

    try {
      // Récupérez le jeton du local storage
      const token = window.localStorage.getItem("token");
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok)
        throw new Error(`Erreur HTTP! statut: ${response.status}`);

      const data = await response.json();
      console.log(data);

      // Ajoutez le nouvel élément à la galerie
      galleryGetData();
      works.push(data);
    } catch (error) {
      console.error("Error :", error);
    }
  });

  const titre = document.getElementById("title");
  console.log(titre);
  const fichier = document.getElementById("monFichier");
  console.log(fichier);
  const categorie = document.querySelector(".maListe");
  console.log(categorie);

  const btnValider = document.querySelector('input[type="submit"]');
  console.log(btnValider);

  function btnDisabled() {
    if (
      // fichier.length > 0 &&
      titre.value.trim() !== "" &&
      categorie.value !== "0"
    ) {
      btnValider.disabled = true;
      btnValider.classList.remove("disabled");
    } else {
      btnValider.disabled = false;
      btnValider.classList.add("disabled");
    }
  }

  fichier.addEventListener("change", btnDisabled);
  titre.addEventListener("input", btnDisabled);
  categorie.addEventListener("change", btnDisabled);
}
