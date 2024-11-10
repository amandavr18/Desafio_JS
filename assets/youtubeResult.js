
//pegando do local storage as palavras que foram salvas na página anterior
const palavrasChaves = localStorage.getItem('palavrasChaves');

// colocando na tela o termo buscado recuperado do localStorage
document.getElementById("resultadoPalavras").innerHTML = `<p>Palavras buscadas: ${palavrasChaves}</p>`




// Função para filtrar vídeos com base no limite de duração por dia
function filtrarVideosPorDia(videos, dias, listContentDetails) {
    return dias.map(dia => {
        let totalDuracao = 0;  // Variável para controlar a soma das durações dos vídeos
        const videosFiltrados = [];

        videos.forEach(video => {
            const videoId = video.id.videoId;

            // Verificando se o videoId existe no listContentDetails
            const videoDetails = listContentDetails.find(item => item.id === videoId);

            if (!videoDetails) {
                console.log(`Detalhes não encontrados para o vídeo: ${videoId}`);
                return;  // Se não encontrar os detalhes, pula esse vídeo
            }

            const videoDuration = videoDetails.contentDetails.duration;
            const videoDurationInMinutes = parseDuration(videoDuration);

            // Se a soma das durações não ultrapassar o limite de minutos do dia, adiciona o vídeo
            if (totalDuracao + videoDurationInMinutes <= dia.maxDuration) {
                videosFiltrados.push(video);
                totalDuracao += videoDurationInMinutes;  // Soma a duração do vídeo ao total
            }
        });

        // Retorna o objeto para o dia, incluindo a soma da duração total para este dia
        return {
            dia: dia.dia,
            maxDuration: dia.maxDuration,  // Inclui o valor máximo de minutos selecionado para o dia
            totalDuracao: totalDuracao,  // Inclui a soma das durações dos vídeos filtrados
            videos: videosFiltrados  // Lista de vídeos filtrados
        };
    });
}


// Função para converter a duração ISO 8601 para minutos
function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 60 + minutes + seconds / 60; // Retorna a duração em minutos
}

// Função para buscar os dias no localStorage
function buscarDias() {
    const dias = [];

    // Itera sobre todas as chaves no localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);

        // Verifica se a chave começa com o prefixo 'dia_'
        if (chave.startsWith("dia_")) {
            // Recupera o valor associado à chave, que é a duração máxima para o dia
            const maxDuration = JSON.parse(localStorage.getItem(chave));

            // Extrai o nome do dia a partir da chave, removendo o prefixo 'dia_'
            const diaNome = chave.replace('dia_', '');

            // Adiciona o dia e sua duração máxima ao array 'dias'
            if (maxDuration !== null && !isNaN(maxDuration)) {
                dias.push({
                    dia: diaNome,
                    maxDuration: maxDuration
                });
            }
        }
    }

    return dias;
}

function carregarVideosDoStorage() {
    const playlist = document.getElementById("playlist");

    // Recupera o resultado do localStorage
    const resultado = JSON.parse(localStorage.getItem("youtubeResult"));
    const listContentDetails = JSON.parse(localStorage.getItem("listContentDetails")).result.items;

    console.log("Vídeos recuperados:", resultado.result.items);
    console.log("Detalhes recuperados:", listContentDetails);

    // Recuperando os dias armazenados no localStorage
    const dias = buscarDias();
    if (!dias || Object.keys(dias).length === 0) {
        console.log("Não há informações de dias no localStorage.");
        playlist.innerHTML = "<p>Não há dados de dias disponíveis.</p>";
        return;
    }

    // Filtrando os vídeos com base nos dias e suas durações
    const videosPorDia = filtrarVideosPorDia(resultado.result.items, dias, listContentDetails);
    if (!videosPorDia || videosPorDia.length === 0) {
        console.log("Não há vídeos para exibir para os dias selecionados.");
        playlist.innerHTML = "<p>Não há vídeos disponíveis para exibir.</p>";
        return;
    }

    // Verificando os vídeos filtrados
    console.log("Vídeos filtrados por dia:", videosPorDia);

    // Iterando sobre os dias e vídeos filtrados
    videosPorDia.forEach(diaObj => {
        // Título com o tempo total escolhido
        playlist.innerHTML += `<h4>Vídeos para ${diaObj.dia}</h4> <p>Tempo total: escolhido ${diaObj.maxDuration}m</p>`;

        let totalDuration = 0;

        // Exibindo os vídeos filtrados
        if (diaObj.videos.length > 0) {
            diaObj.videos.forEach(video => {
                console.log("Vídeo individual:", video);

                // Recuperando a duração do vídeo
                const videoId = video.id.videoId;
                const videoDetails = listContentDetails.find(item => item.id === videoId);

                if (videoDetails) {
                    const videoDuration = videoDetails.contentDetails.duration;
                    const videoDurationInMinutes = parseDuration(videoDuration);
                    const hours = Math.floor(videoDurationInMinutes / 60);
                    const minutes = Math.round(videoDurationInMinutes % 60);
                    totalDuration += videoDurationInMinutes;

                    // Exibindo o vídeo
                    playlist.innerHTML += `
                        <div class="card m-3 video">
                            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                            <div class="detalhes">
                                <p class="m-0">${video.snippet.title}</p>
                                <small>Duração: ${hours}h ${minutes}m</small>
                                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" class="btn btn-sm btn-primary" target="_blank">Assistir</a>
                            </div>  
                        </div>
                    `;
                }
            });

            // Exibindo o total de duração dos vídeos filtrados para o dia
            const totalHours = Math.floor(totalDuration / 60);
            const totalMinutes = Math.round(totalDuration % 60);

            playlist.innerHTML += `
                <p><strong>Total de vídeos neste dia: ${totalHours}h ${totalMinutes}m</strong></p>
                <hr class="p-3"/>
            `;
        } else {
            playlist.innerHTML += "<p>Nenhum vídeo disponível para este dia.</p>";
        }
    });
}







// Carrega os vídeos ao carregar a página
window.onload = carregarVideosDoStorage;