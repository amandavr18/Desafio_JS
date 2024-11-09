import { getPalavrasChaves } from "./app.js";
import { youtubeSearch } from "./youtubeSearch.js";

let playlist = document.getElementById("playlist")

//pegando do local storage as palavras que foram salvas na página anterior
const palavrasChaves = localStorage.getItem('palavrasChaves');

// colocando na tela o termo buscado
document.getElementById("resultadoPalavras").innerHTML = `<p>Palavras buscadas: ${palavrasChaves}</p>`


function carregarVideosDoStorage() {
    // Recupera o resultado armazenado no localStorage
    const resultado = localStorage.getItem("youtubeResult");

    if (!resultado) {
        console.log("Não há vídeos disponíveis para exibir.");
        return;
    }

    const response = JSON.parse(resultado);

    if (!response.result || !response.result.items) {
        console.log("Não há vídeos disponíveis para exibir.");
        return;
    }

    // Exibe os vídeos
    response.result.items.forEach(video => {
        playlist.innerHTML += `
            <div class="mb-3 video">
                <label>Video</label>
                <div class="input-group">
                    <p>${video.snippet.title}</p>
                    <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Assistir</a>
                </div>
            </div>
        `;
    });
}

// Carrega os vídeos ao carregar a página
window.onload = carregarVideosDoStorage;