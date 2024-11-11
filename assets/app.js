// import { youtubeSearch } from "./youtubeSearch.js";
// import { getIds } from "./youtubeSearch.js";
// import { getContentDetails } from "./youtubeSearch.js";
// o códico acima poderia ser reescrito da seguinte forma
import {
    youtubeSearch,
    getIds,
    getContentDetails,
} from './youtubeSearch'

//função para pegar os valores digitados nos campos de cada dia da semana
function getTempos() {

    const diasSemana = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
    /** 
        o array acima poderia ser reescrito em diversas linhas,
        pois dependendo do tamanho da tela disponível fica com scroll horizontal.

        exemplo:
        
        const diasSemana = [
            "segunda",
            "terca",
            "quarta",
            "quinta",
            "sexta",
            "sabado",
            "domingo"
        ];    
    */

    diasSemana.forEach(dia => {
        const valor = document.getElementById(dia).value;
        localStorage.setItem(`dia_${dia}`, valor);
    });
}

// pega as palavras-chaves digitadas
export function getPalavrasChaves() {
    const palavrasChaves = document.getElementById("palavrasChaves").value;
    
    // armazenar no localStorage para usar na outra página
    localStorage.setItem('palavrasChaves', palavrasChaves);
    
    return palavrasChaves;
}

// // faz a autenticação da API
// function loadClientApi() {
//     gapi.client.setApiKey("---");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//                 function(err) { console.error("Error loading GAPI client for API", err); });
// }

// faz a autenticação da API
/**
    A ideia por traz deste refactor da função loadClientApi é 
    tornar o código mais legível e mais estruturado.
    e deixando a identação do código mais alinhada e 
    separando numa segunda linha a função load para economizar espaço horizontal.
    E usar o async await para tornar o código mais padronizasdo
    com outras linguagens de programação que utilizam um paradigma 
    síncrono.
*/
async function loadClientApi() {
    gapi.client.setApiKey('---')
    
    try {
        const result = await gapi.client
            .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
        // Do something with the result if needed!
    } catch(error) {
        console.error('', error)
    } finally {
        /**
            Faz alguma coisa como finalizar loadings
            Ou alguma ação que independa de sucesso ou erro
        */
    }
}

//executa as funções de busca com os dados inseridos e salva em localStorage
// Muito bom!!!! :) 
async function salvar() {
    getTempos();
    getPalavrasChaves();

    try {
        // aguarda o carregamento completo do cliente
        await loadClientApi();
        
        const resultado = await youtubeSearch();

        if (!resultado) {
            console.log("Não há vídeos.");
        } else {
            //salva os videos no localStorage para usar na página videos.html
            localStorage.setItem("youtubeResult", JSON.stringify(resultado));
            console.log("Resultado da busca:", resultado);
            
            //chama os ids e salva no localStorage para usar na página videos.html
            const listId = await getIds(resultado)
            localStorage.setItem("listaIds", JSON.stringify(listId));
            console.log("ids", listId)

            //busca o contentDetails dos ids salvos e salva no localStorage para usar na página videos.html
            const listContentDetails = await getContentDetails(listId)
            localStorage.setItem("listContentDetails", JSON.stringify(listContentDetails));
            console.log("contentDetails", listContentDetails)

            //redireciona para a página com os videos
            window.location.href = "./videos.html";
        }
    } catch (err) {
        console.error("Erro ao carregar o cliente YouTube ou ao buscar vídeos:", err);
    }
}


// executar a função salvar ao clicar no botão
window.salvar = salvar;
