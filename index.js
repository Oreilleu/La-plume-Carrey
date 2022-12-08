const emailjs = require("@emailjs/browser");
// const emailjs = require("@emailjs/browser");

// Recupé et l'envoi des data vers adresee
let firstName = document.getElementById("name");
let surName = document.getElementById("surname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let message = document.getElementById("textarea");

let data = {
  firstName: firstName.value,
  surName: surName.value,
  email: email.value,
  phone: phone.value,
  message: message.value,
};

firstName.addEventListener("change", (e) => {
  data.firstName = e.target.value;
});

surName.addEventListener("change", (e) => {
  data.surName = e.target.value;
});

email.addEventListener("change", (e) => {
  data.email = e.target.value;
});

phone.addEventListener("change", (e) => {
  data.phone = e.target.value;
});

phone.addEventListener("change", (e) => {
  data.message = e.target.value;
});

function submitForm(data, r) {
  alert("ca marche");
  const templateId = "template_icmmgx9";
  const serviceId = "service_9o1u1aq";
  sendMail(serviceId, templateId, {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    reply_to: r.target.reset(),
  });
}

function sendMail(serviceId, templateId, variable) {
  emailjs
    .send(serviceId, templateId, variable, "_mCJ-wnI1bVbtTscw")
    .then((res) => {
      console.log("ok");
    })
    .catch((err) => {
      console.log("pas ok" + err);
    });
}

// La captcha
