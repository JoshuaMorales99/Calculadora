const estadoPantalla = document.getElementById('pantalla'); // Atajo para el estado de la pantalla
let resultado = 0; // Almacenar el resultado de las operaciones
let operadorPrevio = '+'; // Almacenar el operador pervio para luego hacer la operación previa con el operador previo
let caracterPrevio = '0'; // Para controlar el último caracter ingresado
/* ======================================================================================================================================= */

function esNumero(valor) {
    // Verificamos, con una expresion regular, si 'valor' es un posible caracter numerico o punto (.)
    return /[0-9.]/.test(valor);
}
function esOperador(valor) {
    // Verificamos, con una expresion regular, si 'valor' es un posible caracter operador
    return /[+−x÷%√=]/.test(valor);
}
function esOpcion(valor) {
    // Verificamos, con una expresion regular, si 'valor' es una posible opción
    return /[±←]|AC/.test(valor);
}

function hacerCuentaCon(operador) {
    switch (operador) {
        case '+':
            resultado += parseFloat(estadoPantalla.innerText, 10);
        break;

        case '−':
            resultado -= parseFloat(estadoPantalla.innerText, 10);
        break;

        case 'x':
            resultado *= parseFloat(estadoPantalla.innerText, 10);
        break;

        case '÷':
            // VERIFICAR LUEGO DIVISION POR CERO (estadoPantalla.innerText != 0)
            resultado /= parseFloat(estadoPantalla.innerText, 10);
        break;

        case '%':
            estadoPantalla.innerHTML = (parseFloat(estadoPantalla.innerText) * parseFloat(resultado)) / 100;
        break;

        case '√':
            // VERIFICAR LUEGO QUE RESULTADO SEA POSITIVO (estadoPantalla.innerText >= 0)
            estadoPantalla.innerHTML = Math.sqrt(estadoPantalla.innerText);
        break;
    }
}

function ejecutarOpcion(opcion) {
    switch (opcion) {
        case 'AC':
            estadoPantalla.innerHTML = '0';
            resultado = 0;
            operadorPrevio = '+';
            caracterPrevio = '0';
        break;

        case '←':
            // VERIFICAR LUEGO QUE SI SE BORRAN TODOS LOS DÍGITOS, ÉSTE QUEDE EN '0'
            // Borramos el último número
            estadoPantalla.innerHTML = estadoPantalla.innerText.slice(0, -1);
            // PARA DEBUG: Caso especial
            if (caracterPrevio == '=') resultado = parseFloat(resultado.toString().slice(0, -1), 10);
        break;

        case '±':
            // Cambiamos el signo del numero
            estadoPantalla.innerHTML *= (-1);
            // PARA DEBUG: Casi especial
            if (caracterPrevio == '=') resultado *= (-1);
        break;
    }
}

function operarNumero(operador) {
    // Verificamos que el caracterPrevio sea un numero
    if (esNumero(caracterPrevio)) {
        // Caso especial: Raíz
        if (operador == '√') hacerCuentaCon(operador);
        // Caso especial: Porcentaje
        if (operador == '%') hacerCuentaCon(operador);
        
        // Hacemos la cuenta con el operador previo
        hacerCuentaCon(operadorPrevio);
    }

    // Mostramos el resultado por pantalla
    if(operador == '=') estadoPantalla.innerHTML = resultado;
    // Almacenamos el valor del operador para luego hacer la operacion
    operadorPrevio = operador;
    // Almacenamos el carácter para luego hacer verificación
    caracterPrevio = operador;

    console.log(resultado);                                         // OPCIÓN PARA VERIFICAR, BORRAR LUEGO
}

function agregarNumero(numero) {
    // Reseteamos el valor numerico de la pantalla
    if (esOperador(caracterPrevio)) estadoPantalla.innerHTML = 0;

    if (estadoPantalla.innerText.length < 12) {
        // Mostramos por pantalla los numeros que se van ingresando
        (estadoPantalla.innerText == '0' && numero != '.') ? estadoPantalla.innerHTML = numero : estadoPantalla.innerHTML += numero;
        // Almacenamos el carácter para luego hacer verificación
        caracterPrevio = numero;
    }
}

function ejecutarInstruccion(valor) {
    // PARA DEBUG: Verificamos si la cuenta previa terminó
    // if(caracterPrevio == '=') estadoPantalla.innerHTML = '0';

    // Ejecutamos la instrucción correspondiente
    if (esNumero(valor)) {
        // Es numero
        agregarNumero(valor);
    } else if(esOperador(valor)) {
        // Es operador
        operarNumero(valor);
    } else if(esOpcion(valor)) {
        // Es opción
        ejecutarOpcion(valor);
    } else {
        // No implementado
        console.log("Instrucción no implementada");
    }
}

function main() {
    // Empezamos a capturar los botones apretados por el usuario
    const caracteres = document.getElementsByClassName('boton');
    for (let i = 0; i < caracteres.length; i++) {
        caracteres[i].addEventListener('click', (event) => {
            ejecutarInstruccion(event.target.textContent);
        })
    }
} main();