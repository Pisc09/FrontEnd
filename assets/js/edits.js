export function modalPopup() {
  /*************** Récupérations des éléments dans le DOM ***************/
  /*** Function de récupération ***/
  const qS /* querySelector */ = (selector) => document.querySelector(selector);

  /** Récupération des boutons "modifier" */
  const contentTopEdit = qS(".top-bar-edit");
  const btnTopEdit = qS(".btn-top-edit");
  const btnEdit = qS(".btn-edit");
  console.log(btnTopEdit, btnEdit);

  /** Récupération du bouton "login" */
  const logInOut = qS("#log");
  logInOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../contact.html";
  });

  /** Récupération Des Éléments Popup */
  const iXmark = qS(".fa-xmark");
  const iArrowLeft = qS(".fa-arrow-left");
  const sectionParentPopup = qS(".open-popup");
  const formPopup = qS("#formulaire-popup");
  const inputFileLoad = qS(".hide-download-photo");
  console.log(inputFileLoad);
  const bgImgLoad = qS(".bg-image");
  console.log(bgImgLoad);
  const imgPreview = qS(".img-preview");
  // const selectCatg = qS(".maListe");
  // console.log(selectCatg);
  const inputTilte = qS("#title");
  console.log(inputTilte);
  const deletePopup = qS(".content-delete-photo");
  const btnAddPhotos = qS(".btn-add-photo");
  console.log(deletePopup);

  /** Attributs Input Download */
  inputFileLoad.id = "monFichier";
  inputFileLoad.type = "file";
  inputFileLoad.name = "image";

  // selectCatg.id = "maListeCategory";

  /** Function qui ouvre le Popup (Delete photo) avec les 2 boutons "modifier" */
  function openPopup() {
    sectionParentPopup.style.display = "flex";
    iArrowLeft.style.visibility = "hidden";
    formPopup.style.display = "none";
    deletePopup.style.display = "flex";
  }
  btnTopEdit.addEventListener("click", openPopup);
  btnEdit.addEventListener("click", openPopup);
  iArrowLeft.addEventListener("click", openPopup);

  /** Ouverture du Popup (Add photo) */
  btnAddPhotos.addEventListener("click", () => {
    sectionParentPopup.style.display = "flex";
    iArrowLeft.style.visibility = "visible";
    formPopup.style.display = "flex";
    deletePopup.style.display = "none";
  });

  /** Fermeture du Popup */
  iXmark.addEventListener("click", () => {
    sectionParentPopup.style.display = "none";

    const formulaire = document.getElementById("formulaire-popup");

    formulaire.reset();

    imgPreview.src = "";
    imgPreview.alt = "";

    bgImgLoad.style.display = "flex";
  });

  /** Début De Toutes Les Actions Dans Le Popup */
  bgImgLoad.addEventListener("click", () => {
    inputFileLoad.click();
  });
  imgPreview.addEventListener("click", () => {
    inputFileLoad.click();
  });

  inputFileLoad.addEventListener("change", function (e) {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      let reader = new FileReader();

      imgPreview.alt = file.name;

      reader.onload = function (e) {
        imgPreview.src = e.target.result;

        bgImgLoad.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

  /** Fin De Toutes Les Actions Dans Le Popup */

  /** Récupération du BODY */
  const body = document.body;

  if (localStorage.getItem("token")) {
    contentTopEdit.style.display = "flex";
    btnEdit.style.display = "flex";

    logInOut.innerText = "logout";

    body.style.paddingTop = "30px";
  } else {
    contentTopEdit.style.display = "none";
    btnEdit.style.display = "none";

    logInOut.innerText = "login";

    body.style.paddingTop = "0px";
  }
}
