//Daniel Cáceres
//Variables globales
let intentos = 6;
const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es";
let palabra = "APPLE";
palabra = palabraRandom();

function palabraRandom(){
	fetch(API).then((e) => {
		e.json().then((word) => {
			palabra = word[0].toUpperCase();
			cargando = false;
			return palabra;
		});
	});
}

//Constantes del DOM
const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const GRID = document.getElementById("grid");
const CONTENEDOR = document.getElementById('guesses');

//funcion a ejecutar al iniciar la ventana
function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
}
window.addEventListener('load', init)

BUTTON.addEventListener("click", comprobarLetras);
INPUT.addEventListener("keypress", (e) => {
	if(e.key === "Enter"){
		e.preventDefault();
		comprobarLetras();
	}
});

function comprobarLetras(){
	if (intentos == 0){
		palabra = palabraRandom();
		BUTTON.innerHTML = "Intentar";
		GRID.innerHTML = "";
		CONTENEDOR.innerHTML = "";
		INPUT.disabled = false;
		intentos = 6;
		return;
	}
	CONTENEDOR.innerHTML = "";
	const INTENTO = leerIntento();
	if (INTENTO.length == 5){
		intentar(INTENTO);
	}
	else{
		CONTENEDOR.innerHTML = "<h1>LA PALABRA DEBE SER DE 5 LETRAS!</h1>";
	}
	INPUT.value = "";

}

function leerIntento(){
    var intento = INPUT.value;
    var intento = intento.toUpperCase(); 
    return intento;
}

function intentar(INTENTO){
    const ROW = document.createElement('div');
	ROW.className = 'row';
    for (let i in palabra){
    	const SPAN = document.createElement('span');
		SPAN.className = 'letter';
	    if (INTENTO[i]===palabra[i]){ //VERDE
	        SPAN.innerHTML = INTENTO[i];
	        SPAN.style.backgroundColor = 'green';
	    } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
	        SPAN.innerHTML = INTENTO[i];
	        SPAN.style.backgroundColor = 'yellow';
	    } else {      //GRIS
	        SPAN.innerHTML = INTENTO[i];
	        SPAN.style.backgroundColor = 'grey'; //AMARILLO
		}

		ROW.appendChild(SPAN);
		GRID.appendChild(ROW);
	}
	if (INTENTO === palabra ){
        terminar("<h1>GANASTE!😀</h1>");
        intentos = 0;
        return;
    }
	intentos--
	console.log(intentos);
    if (intentos==0){
        terminar("<h1>PERDISTE!😖</h1><h1>LA PALABRA ERA: "+palabra+"</h1>");
    }

}

function terminar(mensaje){
    INPUT.disabled = true;
   	BUTTON.innerHTML = "Reintentar";
    CONTENEDOR.innerHTML = mensaje;
}
