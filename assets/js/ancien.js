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
      console.error("Error", error);
    }
  });
}
