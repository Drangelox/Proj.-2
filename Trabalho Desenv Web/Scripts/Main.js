if(localStorage.getItem("logado") !== null){
    entrar();
}else{
    sair();
};

document.querySelector('#pesquisa-api-b').addEventListener('click', function() {

    var query = document.querySelector('#pesquisa-api').value;
    var msgError = document.getElementById('error');
    var msgError_text = document.createElement('p');
    var resultados = document.getElementById('resultadosAPI');

    resultados.innerHTML='';

    if(query.length<1){
        msgError.innerHtml = '';
        msgError_text.innerHTML="Deve conter pelo menos 1 caracter na pesquisa";
        msgError.appendChild(msgError_text);

    }else{

        axios.get('https://visual-crossing-weather.p.rapidapi.com/location'+query)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
        console.log(error);
        })
    }
});