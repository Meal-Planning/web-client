/**
 * Created by cduzan on 5/21/17.
 */

export function GetIngredients() {
    return genericGet("/api/ingredient");
}

//********** Helpers **********

function genericPost(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
}

function genericGet(url) {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    return fetch('/api/ingredient')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}