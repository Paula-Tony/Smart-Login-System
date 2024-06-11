var registrationForm = document.getElementById("registrationForm");
var loginForm = document.getElementById("loginForm");
var homePage = document.getElementById("homePage");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var welcomeMessage = document.getElementById("welcomeMessage");
var signOutBtn = document.getElementById("signOutBtn");
var signInLink = document.getElementById("signInLink");
var signUpLink = document.getElementById("signUpLink");
var inputsValidation = {
  name: {
    status: false,
    regex: /^[a-z0-9_-]{3,15}$/,
  },
  email: {
    status: false,
    regex: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  password: {
    status: false,
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  },
};

function validateInputs(element) {
  var validation = inputsValidation[element.id];
  var help = element.parentElement.children[`${element.id}Help`];
  if (validation.regex.test(element.value)) {
    validation.status = true;
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    help.classList.add("opacity-0");
  } else {
    validation.status = false;
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    help.classList.remove("opacity-0");
  }
}

function getData() {
  var data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

function saveData(user) {
  var data = getData();
  data.push(user);
  localStorage.setItem("users", JSON.stringify(data));
}

function showHomePage() {
  registrationForm.classList.add("d-none");
  loginForm.classList.add("d-none");
  homePage.classList.remove("d-none");
}

function showLoginPage() {
  homePage.classList.add("d-none");
  registrationForm.classList.add("d-none");
  loginForm.classList.remove("d-none");
}

function showRegistrationPage() {
  homePage.classList.add("d-none");
  loginForm.classList.add("d-none");
  registrationForm.classList.remove("d-none");
}

function sayWelcome(name) {
  welcomeMessage.textContent = `Welcome, ${name}!`;
}

nameInput.addEventListener("input", function () {
  validateInputs(this);
});

emailInput.addEventListener("input", function () {
  validateInputs(this);
});

passwordInput.addEventListener("input", function () {
  validateInputs(this);
});

signOutBtn.addEventListener("click", function () {
  showLoginPage();
});

signInLink.addEventListener("click", function (event) {
  event.preventDefault();
  showLoginPage();
});

signUpLink.addEventListener("click", function (event) {
  event.preventDefault();
  showRegistrationPage();
});

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  for (var key in inputsValidation) {
    if (!inputsValidation[key].status) return false;
  }
  saveData({
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  });
  showHomePage();
  sayWelcome(nameInput.value);
  registrationForm.reset();
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var data = getData();
  var passwordHelp =
    loginPassword.parentElement.children[`${loginPassword.id}Help`];
  var emailHelp = loginEmail.parentElement.children[`${loginEmail.id}Help`];

  for (var user in data) {
    if (data[user].email === loginEmail.value) {
      if (data[user].password === loginPassword.value) {
        showHomePage();
        loginForm.reset();
        emailHelp.classList.add("opacity-0");
        passwordHelp.classList.add("opacity-0");
        return;
      } else {
        passwordHelp.classList.remove("opacity-0");
        emailHelp.classList.add("opacity-0");
        return;
      }
    }
  }
  emailHelp.classList.remove("opacity-0");
  passwordHelp.classList.add("opacity-0");
});
