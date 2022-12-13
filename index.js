// Send email from form
let containerError = document.getElementsByClassName("container-error");
let params = {
  name: "",
  surName: "",
  email: "",
  phone: "",
  message: "",
};
let objectError = {
  name: "",
  email: "",
  phone: "",
  message: "",
  empty: "",
};

function checkData() {
  params = {
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
    document.querySelector(".form_email").style.display = "none";
    document.querySelector(".container_form-captcha").style.display = "block";
  } else {
    let container = document.querySelector(".container-error");
    let ul = document.createElement("ul");
    container.appendChild(ul);
    ul.setAttribute("class", "container_li-error");

    let li = document.createElement("li");
    for (value in objectError) {
      if (objectError[value]) {
        li.innerText = objectError[value];
        ul.appendChild(li);
      }
    }
  }
}

// Vérification données

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
  let regex = new RegExp("^[a-zA-Z]$");
  const tableNumberAndCharSpe = "1234567890#{([|\\@])}=+$£¤*µ%§/:;";
  if (
    params.name.split("").length < 2 ||
    params.name.split("").length > 30 ||
    params.surName.split("").length < 2 ||
    params.surName.split("").length > 30
  ) {
    objectError.name =
      "Le nom et prénom doivent être supèrieur à 2 et infèrieurs à 30 caractère";
    return false;
  }
  // else if (
  //   params.name.includes(tableNumberAndCharSpe) ||
  //   params.surName.includes(tableNumberAndCharSpe)
  // ) {
  //   objectError.name =
  //     "Les nom et prénoms ne doivent pas contenir de caractère spéciaux n'y de chiffre";
  //   return false;
  // }
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
  if (params.phone) {
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
  return true;
}

// Gestion captcha
setCaptcha();

function generateArray() {
  let out = [];
  const characters =
    "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789".split("");

  for (let i = 0; i < 6; i++) {
    let randomCharacters =
      characters[Math.floor(Math.random() * characters.length)];
    out.push(randomCharacters);
  }
  return out;
}

function setCaptcha() {
  const randomCharacters = generateArray().join(" ");
  document.querySelector(".captcha").innerHTML = randomCharacters;
}

function checkCaptchaThenSendMail() {
  const captcha = document
    .querySelector(".captcha")
    .innerHTML.split("")
    .reduce((acc, current) => (current === " " ? acc : [...acc, current]), "")
    .join("");

  const valueCaptcha = document
    .querySelector(".value-captcha")
    .value.split("")
    .reduce((acc, current) => (current === " " ? acc : [...acc, current]), "")
    .join("");

  if (captcha !== valueCaptcha) {
    document.querySelector(".captcha-error").style.display = "block";
    document.querySelector(".captcha-error").innerText = "Captcha incorrect";
    return;
  }
  document.querySelector(".captcha-error").style.display = "none";
  sendMail();
}

function sendMail() {
  const templateId = "template_icmmgx9";
  const serviceId = "service_9o1u1aq";

  emailjs
    .send(serviceId, templateId, params, "_mCJ-wnI1bVbtTscw")
    .then((res) => {
      alert(
        "Votre message à bien été envoyé, je vous repondrai dans les plus bref delais"
      );
      window.location = "/";
      // document.getElementById("name").value = "";
      // document.getElementById("surname").value = "";
      // document.getElementById("email").value = "";
      // document.getElementById("phone").value = "";
      // document.getElementById("textarea").value = "";
    })
    .catch((err) => {
      console.log(err);
      alert("Un problème est survenue !");
      window.location = "/";
    });
}
