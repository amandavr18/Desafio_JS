
import { getPalavrasChaves } from "./app.js";

export function youtubeSearch() {

    const palavrasChaves = getPalavrasChaves();

    console.log(palavrasChaves)

    return gapi.client.youtube.search.list({
        "part": [
        "snippet"
        ],
        "maxResults": 5,
        "q": palavrasChaves
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                },
                function(err) { console.error("Execute error", err); });
}

gapi.load("client");
