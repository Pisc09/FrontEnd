import { categories, categoriesData, categoriesShow } from "./categories.js";
import {
  galleryGetData,
  filterCategories,
  generatePhotos,
} from "./galleries.js";
import { modalPopup } from "./edits.js";
import { soumettreFormulaire } from "./formulaire.js";

const formulaire = document.getElementById("formulaire-popup");

/**Page categories.js */
categoriesData();
categoriesShow();
/**Page galleries.js */
galleryGetData();
filterCategories();
generatePhotos();
/**Page login.js */
/**Page edits.js */
modalPopup();
/**Page formulaire.js */
// soumettreFormulaire();

formulaire.addEventListener("submit", async (e) => {
  e.preventDefault();

  soumettreFormulaire();
});
