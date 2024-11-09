import { getPalavrasChaves } from "./app.js";
import { youtubeSearch } from "./youtubeSearch.js";

let playlist = document.getElementById("playlist")

//pegando do local storage as palavras que foram salvas na página anterior
const palavrasChaves = localStorage.getItem('palavrasChaves');

// colocando na tela o termo buscado
document.getElementById("resultadoPalavras").innerHTML = `<p>Palavras buscadas: ${palavrasChaves}</p>`



youtubeSearch()
    .then(response => {
        console.log("result", response)
        if (!response || !response.result || !response.result.items) {
            console.log("Não há vídeos disponíveis para exibir.");
            return;
        }

        // Acessando a lista de vídeos (caso o retorno tenha 'items')
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
    })
    .catch(err => {
        console.error("Erro ao carregar os vídeos:", err); // Exibe erro caso ocorra
    });