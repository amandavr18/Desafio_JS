import { Tempos } from "./tempos.js"
import { youtubeSearch } from "./youtubeSearch.js";

const tempos = new Tempos()

//função para pegar os valores digitados nos campos de cada dia da semana
function getTempos() {
    tempos.diasSemana.segunda = document.getElementById("segunda").value, 'segunda';
    tempos.diasSemana.terca = document.getElementById("terca").value;
    tempos.diasSemana.quarta = document.getElementById("quarta").value;
    tempos.diasSemana.quinta = document.getElementById("quinta").value;
    tempos.diasSemana.sexta = document.getElementById("sexta").value;
    tempos.diasSemana.sabado = document.getElementById("sabado").value;
    tempos.diasSemana.domingo = document.getElementById("domingo").value;

    // armazenar no localStorage para usar na outra página
    localStorage.setItem('segunda', tempos.diasSemana.segunda);
    localStorage.setItem('terca', tempos.diasSemana.terca);
    localStorage.setItem('quarta', tempos.diasSemana.quarta);
    localStorage.setItem('quinta', tempos.diasSemana.quinta);
    localStorage.setItem('sexta', tempos.diasSemana.sexta);
    localStorage.setItem('sabado', tempos.diasSemana.sabado);
    localStorage.setItem('domingo', tempos.diasSemana.domingo);
}

// pega as palavras-chaves digitadas
export function getPalavrasChaves() {
    const palavrasChaves = document.getElementById("palavrasChaves").value;
    
    // armazenar no localStorage para usar na outra página
    localStorage.setItem('palavrasChaves', palavrasChaves);
    
    return palavrasChaves;
}

function loadClientApi() {
    gapi.client.setApiKey("AIzaSyDA0AUlmEoAoiz7cJI9wmTtR2ew0z_kVsc");
    // gapi.client.setApiKey("---");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}

async function salvar() {
    getTempos();
    getPalavrasChaves();

    try {
        // Aguarda o carregamento completo do cliente
        await loadClientApi();
        
        const resultado = await youtubeSearch();

        if (!resultado) {
            console.log("Não há vídeos.");
        } else {
            localStorage.setItem("youtubeResult", JSON.stringify(resultado));
            window.location.href = "./videos.html";
            console.log("Resultado da busca:", resultado);
        }
    } catch (err) {
        console.error("Erro ao carregar o cliente YouTube ou ao buscar vídeos:", err);
    }
}


// executar a função salvar ao clicar no botão
window.salvar = salvar;
