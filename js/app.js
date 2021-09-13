//variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event listener
eventListeners();

function eventListeners() {

    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}


//funciones
function agregarTweet(e) {
    e.preventDefault();

    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet === '') {
        mostrarError('un mensaje no puede ir vacio');
        return; // evita que ejecuten mas lineas de codigo
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //anadir al arreglo de tweets
    tweets = [...tweets, tweetObj];


    //una vez agregado vamos a crear el html
    crearHTML();

    //reiniciar el formulario

}

//mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000)


}

//muestra el listado  de los tweets
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            //crear boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //anadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //crear el HTML
            const li = document.createElement('li');


            //anadir el texto
            li.innerText = tweet.tweet;

            //asignar el boton 
            li.appendChild(btnEliminar);

            //insertarlo en el html\
            listaTweets.appendChild(li);

        });
    }
    sincronizarStorage();
}
//  agrega los tweets actuales a localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}
//limpiar HTML 
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}