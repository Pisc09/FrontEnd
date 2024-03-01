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
      const token = window.localStorage.getItem("token"); // Récupérez le jeton du local storage
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
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
}

// export function disabled() {
//   function btnValiderDisabled() {
//     const fichier = document.getElementById("monFichier").files;
//     const titre = document.querySelector("#title").value;
//     const categorie = document.querySelector(".maListe").value;

//     const btnValider = document.querySelector('input[value="Valider"]');

//     if (
//       titre.value.trim() !== "" &&
//       categorie.value !== "0" &&
//       fichier.length > 0
//     ) {
//       btnValider.disabled = false;
//       btnValider.classList.remove("disabled");
//     } else {
//       btnValider.disabled = true;
//       btnValider.classList.add("disabled");
//     }
//   }

//   const titre = document.querySelector("#title");
//   const categorie = document.querySelector(".maListe");
//   const fichier = document.getElementById("monFichier");

//   titre.addEventListener("input", btnValiderDisabled);
//   categorie.addEventListener("change", btnValiderDisabled);
//   fichier.addEventListener("change", btnValiderDisabled);
// }
