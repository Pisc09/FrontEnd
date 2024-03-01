import { categories, categoriesData, categoriesShow } from "./categories.js";
import {
  galleryGetData,
  filterCategories,
  generatePhotos,
} from "./galleries.js";
import { loginAuth } from "./login.js";
import { modalPopup } from "./edits.js";
import { soumettreFormulaire /*disabled*/ } from "./formulaire.js";

/**Page categories.js */
categoriesData();
categoriesShow();
/**Page galleries.js */
galleryGetData();
filterCategories();
generatePhotos();
/**Page login.js */
loginAuth();
/**Page edits.js */
modalPopup();
/**Page formulaire.js */
soumettreFormulaire();
// disabled();
