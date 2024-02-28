//Daniel Cáceres
//Variables globales
let intentos = 6;
const diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

//Constantes del DOM
const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const GRID = document.getElementById("grid");
const CONTENEDOR = document.getElementById('guesses');

//funcion a ejecutar al iniciar la ventana
function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}
window.addEventListener('load', init)

BUTTON.addEventListener("click", comprobarLetras);
function comprobarLetras(){
	CONTENEDOR.innerHTML = "";
	const INTENTO = leerIntento();
	if (INTENTO.length == 5){
		intentar(INTENTO);
	}
	else{
		CONTENEDOR.innerHTML = "<h1>LA PALABRA DEBE SER DE 5 LETRAS!</h1>";
	}
}

function intentar(INTENTO){
    const ROW = document.createElement('div');
	ROW.className = 'row';
    for (let i in palabra){
    	const SPAN = document.createElement('span');
		SPAN.className = 'letter';
	    if (intento[i]===palabra[i]){ //VERDE
	        SPAN.innerHTML = intento[i];
	        SPAN.style.backgroundColor = 'green';
	    } else if( palabra.includes(intento[i]) ) { //AMARILLO
	        SPAN.innerHTML = intento[i];
	        SPAN.style.backgroundColor = 'yellow';
	    } else {      //GRIS
	        SPAN.innerHTML = intento[i];
	        SPAN.style.backgroundColor = 'grey';
		}

		ROW.appendChild(SPAN);
		GRID.appendChild(ROW);
	}
	if (INTENTO === palabra ){
        terminar("<h1>GANASTE!😀</h1>")
        return;
    }
	intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE!😖</h1>")
    }
}

function leerIntento(){
    intento = INPUT.value;
    intento = intento.toUpperCase(); 
    return intento;
}
function terminar(mensaje){
    INPUT.disabled = true;
    BUTTON.disabled = true;
    CONTENEDOR.innerHTML = mensaje;
}
