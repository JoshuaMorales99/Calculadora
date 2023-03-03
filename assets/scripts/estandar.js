const estadoPantalla = document.getElementById('pantalla'); // Atajo
let resultado = 0; // Para almacenar el resultado de las operaciones
let operadorGuardado = '+'; // Para hacer la cuentaPrevia con el operador
let caracterPrevio = '0'; // Para controlar el último caracter ingresado

//let valorNumerico = 0;                                            ANTIGUA OPCIÓN. BORRAR LUEGO

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
    return /[±◀]|AC/.test(valor);
}

function hacerCuentaPrevia() {
    switch (operadorGuardado) {
        case '+':
            //resultado += parseFloat(valorNumerico, 10);           ANTIGUAS OPCIONES. BORRAR LUEGO
            resultado += parseFloat(estadoPantalla.innerText, 10);
        break;

        case '−':
            //resultado -= parseFloat(valorNumerico, 10);
            resultado -= parseFloat(estadoPantalla.innerText, 10);
        break;

        case 'x':
            //resultado *= parseFloat(valorNumerico, 10);
            resultado *= parseFloat(estadoPantalla.innerText, 10);
        break;

        case '÷':
            //resultado /= parseFloat(valorNumerico, 10);
            resultado /= parseFloat(estadoPantalla.innerText, 10);
        break;

        case '%':
        break;

        case '√':
        break;

        default:
            
        break;
    }
}

function operarNumero(operador) {
    // Verificamos que el caracterPrevio sea un numero
    if (esNumero(caracterPrevio)) {
        /*                                                          ANTIGUA OPCIÓN, BORRAR LUEGO
        Almacenamos el valor numerico ingresado
        valorNumerico = estadoPantalla.innerText;
        */
        
        // Hacemos la cuenta con el signo previo
        hacerCuentaPrevia();
        // Reseteamos el valor numerico de la pantalla
        estadoPantalla.innerHTML = 0;
    }

    // Mostramos el resultado por pantalla
    if(operador == '=') {
        estadoPantalla.innerHTML = resultado;
    }

    // Almacenamos el valor del operador para luego hacer la operacion
    operadorGuardado = operador;
    // Almacenamos el carácter para luego hacer verificación
    caracterPrevio = operador;

    console.log(resultado);                                         // OPCIÓN PARA VERIFICAR, BORRAR LUEGO
}

function agregarNumero(numero) {
    // Mostramos por pantalla los numeros que se van ingresando
    (estadoPantalla.textContent == '0' && numero != '.') ? estadoPantalla.innerHTML = numero : estadoPantalla.innerHTML += numero;
    // Almacenamos el carácter para luego hacer verificación
    caracterPrevio = numero;
}

function ejecutarInstruccion(valor) {
    // PARA DEBUG: Verificamos si la cuenta previa terminó
    if(caracterPrevio == '=') estadoPantalla.innerHTML = '0';

    // Ejecutamos la instrucción correspondiente
    if (esNumero(valor)) {
        // Es numero
        agregarNumero(valor);
    } else if(esOperador(valor)) {
        // Es operador
        operarNumero(valor);
    } else if(esOpcion(valor)) {
        // Es opción
        console.log("Es una opción");
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