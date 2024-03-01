import { filterCategories } from "./galleries.js";

export let categories = [];

export function categoriesData() {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const categoryTous = {
        id: 0,
        name: localStorage.getItem("token")
          ? "Veuillez choisir votre catégorie"
          : "Tous",
      };
      data.unshift(categoryTous);
      categories = data;
      categoriesShow();
    })
    .catch((error) =>
      console.error("Erreur lors de la connexion au serveur :", error)
    );
}

export function categoriesShow() {
  const sectPortfolio = document.querySelector("#portfolio");
  console.log(sectPortfolio);
  const titreMesProjets = document.querySelector("#portfolio .edit");
  console.log(titreMesProjets);

  const navCategories = document.createElement("nav");
  navCategories.classList.add("nav-categories");

  for (let i = 0; i < categories.length; i++) {
    const listCategories = categories[i].id;
    console.log(listCategories);

    const btnsCategories = document.createElement("button");
    btnsCategories.innerText = categories[i].name;
    btnsCategories.classList.add("btns-categories");
    console.log(btnsCategories);

    // Ajoutez la classe 'default-selected' au bouton "Tous" par défaut
    if (categories[i].name === "Tous") {
      btnsCategories.classList.add("default-selected");
    }

    btnsCategories.addEventListener("click", () => {
      // Retirez la classe 'selected' de tous les boutons
      const allBtns = document.querySelectorAll(".btns-categories");
      allBtns.forEach((btn) => {
        btn.classList.remove("selected");
      });

      // Retirez la classe 'default-selected' du bouton "Tous"
      const defaultBtn = document.querySelector(".default-selected");
      if (defaultBtn) {
        defaultBtn.classList.remove("default-selected");
      }

      // Ajoutez la classe 'selected' au bouton cliqué
      btnsCategories.classList.add("selected");

      filterCategories(categories[i].id);
    });

    navCategories.appendChild(btnsCategories);
    sectPortfolio.insertBefore(navCategories, titreMesProjets.nextSibling);
  }

  /** Catégories pour la liste déroulante dans le Popup */
  const listSelectCat = document.querySelector(".maListe");
  // Assurez-vous de vider la liste déroulante avant d'ajouter de nouvelles options
  listSelectCat.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    const optionCategory = document.createElement("option");
    optionCategory.innerText = categories[i].name;
    optionCategory.value = categories[i].id;

    listSelectCat.appendChild(optionCategory);
  }

  if (localStorage.getItem("token")) {
    navCategories.style.display = "none";
  } else {
    navCategories.style.display = "flex";
  }
}
