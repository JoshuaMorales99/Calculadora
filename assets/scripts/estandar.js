function agregarNumero(numero) {
    const estadoPantalla = document.getElementById('pantalla');
    if (estadoPantalla.textContent == '0' && numero != '.') {
        estadoPantalla.innerHTML = numero;
    } else {
        estadoPantalla.innerHTML += numero;
    }
}

function esNumero(valor) {
    // Verificamos con una expresion regular, si 'valor' es un posible caracter numerico (incluido el .)
    return /[0-9.]/.test(valor);
}

function ejecutarInstruccion(valor) {
    // Verificamos que instrucción se debe ejecutar
    if (esNumero(valor)) {
        agregarNumero(valor);
    } else {
        console.log("Ejecutar otra instrucción");
        // Ejecutar demás instrucciones
    }
}

function main() {
    const elementos = document.getElementsByClassName('boton');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener('click', (event) => {
            ejecutarInstruccion(event.target.textContent);
        })
    }
} main();