
// import { getPalavrasChaves } from "./app.js";
import { videos } from "./mock.js";


// faço a busca com as palavras chaves seleciondas pelo usuário
export async function youtubeSearch(useMock = false) {
    try {
        //pegando o que foi salvo em localstorage
        const palavrasChaves = localStorage.getItem('palavrasChaves');

        console.log("Palavras-Chaves:", palavrasChaves);

        if(useMock) {
            console.log("usando mock")
            return Promise.resolve(videos)
        } 

        // Verificação se o cliente YouTube foi carregado
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


// pego os ids do resultado da busca
export async function getIds(response) {
    try {

        // Verificação se tem response
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
    console.log("listContentDetails", listContentDetails);
    return listContentDetails;

    } catch (e) {
        console.error("Erro na busca da minutagem do YouTube:", e);
        return null;
    }
}


gapi.load("client");
