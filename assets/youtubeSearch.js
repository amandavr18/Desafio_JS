
// import { getPalavrasChaves } from "./app.js";
import { videos } from "./mock.js";


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
                "maxResults": 50,
                "q": palavrasChaves
            });

            console.log("Response", response);
            return response;

             } catch (e) {
                    console.error("Erro na busca do YouTube:", e);
                    return null;
                }
}

  gapi.load("client");

