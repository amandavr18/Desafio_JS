
// faço a busca com as palavras chaves seleciondas pelo usuário
export async function youtubeSearch() {
    try {
        //pegando o que foi salvo em localstorage
        const palavrasChaves = localStorage.getItem('palavrasChaves');

        // verifica se o cliente foi carregado
        if (!gapi.client.youtube) {
            console.error("Cliente YouTube não carregado. Aguarde o carregamento completo antes de realizar a busca.");
            return null;
        }

        const response = await gapi.client.youtube.search.list({
                "part": [
                "snippet"
                ],
                "maxResults": 200,
                "q": palavrasChaves
            });

            console.log("Response", response);

            return response;

             } catch (e) {
                    console.error("Erro na busca do YouTube:", e);
                    return null;
                }
                      
}


// pego os ids do resultado da busca para fazer uma nova consulta e pegar a duração dos vídeos
export async function getIds(response) {
    try {

        // verifica se tem response
        if (!response) {
            console.error("nao tem response");
            return null;
        }

        const ids = response.result.items.map(item => item.id.videoId);
            console.log("ids", ids);

            return ids;

             } catch (e) {
                    console.error("Erro na busca do YouTube:", e);
                    return null;
                }
}


// faço uma nova busca nos ids dos videos para trazer o ContentDetail que possui a informação de duração do vídeo
export async function getContentDetails(ids) {
    try {
    const listContentDetails = await gapi.client.youtube.videos.list({
      "part": [
        "contentDetails"
      ],
      "id": [
        ids
      ]
    })
    
    return listContentDetails;

    } catch (e) {
        console.error("Erro na busca da minutagem do YouTube:", e);
        return null;
    }
}


gapi.load("client");
