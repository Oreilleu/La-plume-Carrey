// Send email from form
let containerError = document.getElementsByClassName("container-error");
let objectError = {
  name: "",
  email: "",
  phone: "",
  message: "",
  empty: "",
};

function sendMail() {
  const params = {
    name: document.getElementById("name").value,
    surName: document.getElementById("surname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("textarea").value,
  };

  if (
    checkName(params) &&
    checkEmpty(params) &&
    checkEmail(params) &&
    checkPhone(params)
  ) {
    const templateId = "template_icmmgx9";
    const serviceId = "service_9o1u1aq";

    emailjs
      .send(serviceId, templateId, params, "_mCJ-wnI1bVbtTscw")
      .then((res) => {
        console.log("herrre");
        alert("ca passe");
        document.getElementById("name").value = "";
        document.getElementById("surname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("textarea").value = "";
      })
      .catch((err) => {
        console.log(err);
        console.log("ca marche pas");
      });
  } else {
    // Afficher les erreur
    console.log(objectError);
  }
}

function checkEmpty(params) {
  if (
    params.name === "" ||
    params.surName === "" ||
    params.email === "" ||
    params.message === ""
  ) {
    objectError.empty = "Les fields avec astérix doivent étre rempli !";
    return false;
  }
  objectError.empty = "";
  return true;
}

function checkName(params) {
  if (
    params.name.split("").length < 2 ||
    params.name.split("").length > 30 ||
    params.surName.split("").length < 2 ||
    params.surName.split("").length > 30
  ) {
    objectError.name =
      "Le nom et prénom doivent être supèrieur à 2 et infèrieurs à 40 caractère";
    return false;
  } else if (
    params.name.includes("0123456789?,.;/:§!%µ*£$¤+={}[]()@\\|#~&²") ||
    params.surName.includes("0123456789?,.;/:§!%µ*£$¤+={}[]()@\\|#~&²")
  ) {
    objectError.name =
      "Les nom et prénoms ne doivent pas contenir de caractère spéciaux n'y de chiffre";
    return false;
  }
  objectError.name = "";
  return true;
}

function checkEmail(params) {
  let regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  if (regex.test(params.email)) {
    objectError.email = "";
    return true;
  } else {
    objectError.email = "L'adresse email doit être valide";
    return false;
  }
}

function checkPhone(params) {
  const phoneNumber = params.phone
    .split("")
    .reduce((acc, current) => (current === " " ? acc : [...acc, current]), "")
    .join("");

  const regex = new RegExp(
    "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"
  );

  if (regex.test(phoneNumber)) {
    objectError.phone = "";
    return true;
  } else {
    objectError.phone = "Le numéro de téléphone n'est pas valide";
    return false;
  }
}

// La captcha

// Fonction qui génère 8 chiffres et lettres aléatoire
function generateArray() {
  const dico = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789";
}
generateArray();
// Au clique sur reload on relance la fonction génératrice et on rempli la div

// Au clique sur submit on compare le contenu de la div avec la donnée saisie

// Si identique return true
