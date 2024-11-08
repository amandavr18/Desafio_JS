import { Tempos } from "./tempos.js"
import { youtubeSearch } from "./youtubeSearch.js";

const tempos = new Tempos()


//funcao para carregar API do google
function loadClientApi() {
    gapi.client.setApiKey("AIzaSyDA0AUlmEoAoiz7cJI9wmTtR2ew0z_kVsc");
    // gapi.client.setApiKey("-");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}


//função para pegar os valores digitados nos capos de cada dia da semana
function getTempos() {
    tempos.diasSemana.segunda = document.getElementById("segunda").value;
    tempos.diasSemana.terca = document.getElementById("terca").value;
    tempos.diasSemana.quarta = document.getElementById("quarta").value;
    tempos.diasSemana.quinta = document.getElementById("quinta").value;
    tempos.diasSemana.sexta = document.getElementById("sexta").value;
    tempos.diasSemana.sabado = document.getElementById("sabado").value;
    tempos.diasSemana.domingo = document.getElementById("domingo").value;
}

// //função para transformar as palavras chaves digitadas em um array de palavras
export function getPalavrasChaves() {
    return document.getElementById("palavrasChaves").value
}


function salvar() {
    getTempos() 
    getPalavrasChaves()
    youtubeSearch()

    console.log(tempos)
    
}


// executar função ao carregar a página
window.onload = function() {
    loadClientApi();
};

window.salvar = salvar;






//chave API GOOGLE
// AIzaSyDA0AUlmEoAoiz7cJI9wmTtR2ew0z_kVsc