//funcion ANONIMA AUTOINVOCADA

(() => {
    'use stric'

let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

// let puntosJugador = 0,
//     puntosComputadora = 0;

let puntosJugadores = [];

//Referencias al HTML
const btnGetCard = document.querySelector('#getCard');
const btnDetener = document.querySelector('#stop')
const btnNewGame = document.querySelector('#newGame')
const mostrarPuntos = document.querySelectorAll('small')
const divCartas = document.querySelectorAll('.divCartas')
// const divJugaodrCartas = document.querySelector("#jugador-cartas")
// const divComputadoraCartas = document.querySelector("#computadora-cartas")

const inicializarJuego = (numeroJugadores = 2) => {
    deck = [];
    puntosJugadores = [];
    crearDeck();
    for (let i = 0; i < numeroJugadores; i++) {
        puntosJugadores.push(0)
    }


    mostrarPuntos.forEach(element => element.innerText = 0)
    divCartas.forEach(element => element.innerHTML = '')

    btnDetener.disabled = false;
    btnGetCard.disabled = false;
}
//esta funcion crea una nueva barraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)

        }
    }

    for (let especial of especiales) {
        for (let tipo of tipos) {
            deck.push(especial + tipo)
        }
    }
    //devuelve la lista revuelta con la libreria underscore//

    return deck = _.shuffle(deck);

}


const pedirCarta = () => {

    const carta = (deck.length === 0) ? 'Ya no hay cartas' : deck.pop()
    return carta
}


const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1
}

const crearCarta = (posicion, carta) => {
    // <!-- <img class="carta" src="assets/cartas/10C.png" alt=""> -->
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add("carta")
    divCartas[posicion].appendChild(imgCarta)

}
//Turno: 0 es igual al primer jugador y el ultimo la computadora
const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);

    mostrarPuntos[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno]
}

//turno Computadora
const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0
    do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)

        crearCarta(puntosJugadores.length - 1, carta)

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

    ganador(puntosComputadora);
}

///eventos
btnGetCard.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(0, carta)

    if (puntosJugador > 21) {
        console.warn("Lo siento papu, perdiste")
        btnGetCard.disabled = true
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador)
    }
    else if (puntosJugador === 21) {
        console.warn("Ganaste que Pro")
        btnGetCard.disabled = true
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }

})
btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnGetCard.disabled = true;
    turnoComputadora(puntosJugadores[0]);
})

btnNewGame.addEventListener('click', () => {
    inicializarJuego();
})

const ganador = () => {
    //dar tiempo que aparezca el ganador desopues que aparezca el ganador
    // const puntosComputadora = puntosJugadores[puntosJugadores.length- 1]
    // let puntosJugador = puntosJugadores[0]

    //desestructarizar el arreglo, aunque me genera un error
    const [puntosJugador, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
        if (puntosComputadora === puntosJugador) {
            alert('EMPATE')
        }
        else if (puntosComputadora >= 21) {
            alert('Felicidades Ganaste')
        }
        else if (puntosComputadora <= 21) {
            alert('LA COMPUTADORA GANA')
        }
        //si una saca 21 esa tiene que ganar
    }, 100)
    console.log(puntosJugadores)

}

return{
    nuevoJuego: inicializarJuego()
};

})();






