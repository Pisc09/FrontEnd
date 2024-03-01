let works = [];
export function galleryGetData(filtreCategories = []) {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      works = data;
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      const filteredWorks =
        filtreCategories.length > 0 ? filtreCategories : works;
      filteredWorks.forEach((compo) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figCaptn = document.createElement("figcaption");

        image.src = compo.imageUrl;
        figCaptn.innerText = compo.title;

        figure.appendChild(image);
        figure.appendChild(figCaptn);

        gallery.appendChild(figure);
      });
      generatePhotos(); // Appeler la fonction pour générer les photos
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}
export function filterCategories(idCat) {
  const filtreCategories =
    idCat > 0 ? works.filter((item) => item.categoryId === idCat) : works;
  galleryGetData(filtreCategories);
}
export function generatePhotos() {
  const photosDiv = document.querySelector(".photos");
  photosDiv.innerHTML = ""; // Vide .photos avant d'ajouter de nouvelles photos
  works.forEach((work) => {
    const span = document.createElement("span");
    const img = document.createElement("img");
    const iDelete = document.createElement("i");

    img.src = work.imageUrl;
    iDelete.classList.add("fa-solid", "fa-trash-can");

    iDelete.addEventListener("click", () => {
      // Récupérez votre jeton d'authentification
      const token = window.localStorage.getItem("token");

      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          // Supprimez l'élément span du DOM
          span.remove();

          // Mettez à jour la variable 'works' localement
          works = works.filter((item) => item.id !== work.id);

          // Mettez à jour les images sur la page
          galleryGetData();
        })
        .catch((error) => {
          console.error("Erreur :", error);
        });
    });
    span.appendChild(img);
    span.appendChild(iDelete);

    photosDiv.appendChild(span);
  });
}
