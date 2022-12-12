function matchEmail(campoEmail) {
  user = campoEmail.value.substring(0, campoEmail.value.indexOf("@"));
  dominio = campoEmail.value.substring(
    campoEmail.value.indexOf("@") + 1,
    campoEmail.value.length
  );

  if (
    user.length >= 1 &&
    dominio.length >= 3 &&
    user.search("@") == -1 &&
    dominio.search("@") == -1 &&
    user.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    return true;
  } else {
    return false;
  }
}

function senhaVerificacao(passW) {

  palavrachave = passW.value;

  if (palavrachave.length >=3) {
    return true;
  } else {
    return false;
  }
}

function matchSenha(campo1, campo2) {
  palavrachave = campo1.value;
  match = campo2.value;

  if (palavrachave === match) {
    return true;
  } else {
    return false;
  }
}


////Funcoes//////

document.addEventListener("DOMContentLoaded", () => {
  const formularioLogin = document.querySelector("#login");
  const criacaoFormularioConta = document.querySelector("#register");

  var errorMsg = document.createElement("p");
  var mensagemSucesso = document.createElement("p");
  var emailC;
  var senhaC;
  var senhaVali;

  document.querySelector("#criarConta-link").addEventListener("click", (e) => {
    e.preventDefault();
    formularioLogin.classList.add("form-hidden");
    criacaoFormularioConta.classList.remove("form-hidden");
  });

  document.querySelector("#loginPage-link").addEventListener("click", (e) => {
    e.preventDefault();
    formularioLogin.classList.remove("form-hidden");
    criacaoFormularioConta.classList.add("form-hidden");
  });

  formularioLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    emailC = document.getElementById("login-averigua");
    senhaC = document.getElementById("password-averigua");

    if (matchEmail(emailC) && senhaVerificacao(senhaC)) {
      axios.post('https://reqres.in/api/login', {
            email: document.getElementById("login-averigua").value,
            password: document.getElementById("password-averigua").value
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem('logado',1)
            entrar();
          }
        })
        .catch(function (error) {
          errorMsg.innerHTML = '';
          console.log(error.response.data.error);
          errorMsg.innerHTML = error.response.data.error;
          document.getElementById('loginErrorMsg').appendChild(errorMsg);
        });
    } else if (!matchEmail(emailC)) {
      errorMsg.innerHTML = 'E-mail Incorreto';
      document.getElementById("loginErrorMsg").appendChild(errorMsg);
    } else if (!senhaVerificacao(senhaC)) {
      errorMsg.innerHTML = 'Defina uma senha  com mais de 3 caracteres';
      document.getElementById("loginErrorMsg").appendChild(errorMsg);
    }
  });

  criacaoFormularioConta.addEventListener("submit", (e) => {
    e.preventDefault();
    emailC = document.getElementById("e-mail-register");
    senhaC = document.getElementById("password-register");
    senhaVali = document.getElementById("pass-confirm");
    errorMsg.innerHTML = "";
    mensagemSucesso.innerHTML = "";

    if (
      matchEmail(emailC) &&
      senhaVerificacao(senhaC) &&
      matchSenha(senhaC, senhaVali)
    ) {
      axios.post("https://reqres.in/api/register", {
          email: document.getElementById("e-mail-register").value,
          password: document.getElementById("password-register").value,
        })

        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            mensagemSucesso.innerHTML = "Cadastrado com sucesso!";
            document
              .getElementById("sucessMsg-cadastro")
              .appendChild(mensagemSucesso);
          }
        })
        .catch(function (error) {
          console.log(error.response);
        });
    } else if (!matchEmail(emailC)) {
      errorMsg.innerHTML = "E-mail Informado ";
      document.getElementById("errorMsg-cadastro").appendChild(errorMsg);
    } else if (!senhaVerificacao(senhaC)) {
      errorMsg.innerHTML = "Defina uma senha  com mais de 3 caracteres!";
      document.getElementById("errorMsg-cadastro").appendChild(errorMsg);
    } else if (!matchSenha(senhaC, senhaVali)) {
      errorMsg.innerHTML = "Senhas são diferentes. Digite novamente";
      document.getElementById("errorMsg-cadastro").appendChild(errorMsg);
    }
  });
});
