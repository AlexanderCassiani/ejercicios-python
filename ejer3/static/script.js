const inputNumero = document.getElementById("numero");
const mensaje = document.getElementById("mensaje");
const textoIntentos = document.getElementById("intentos");

let numeroSecreto = 0;
let intentos = 0;

async function iniciarJuego() {
  const respuesta = await fetch("/numero");
  const datos = await respuesta.json();

  numeroSecreto = datos.numero;
  intentos = 0;

  inputNumero.value = "";
  mensaje.textContent = "Adivina el número entre 1 y 100";
  textoIntentos.textContent = "Intentos: 0";
}

document.getElementById("btnAdivinar").addEventListener("click", () => {
  if (inputNumero.value === "") {
    return;
  }

  const numero = parseInt(inputNumero.value);
  intentos++;
  textoIntentos.textContent = `Intentos: ${intentos}`;

  if (numero === numeroSecreto) {
    mensaje.textContent = `¡Correcto! Lo adivinaste en ${intentos} intentos`;
  } else if (numero < numeroSecreto) {
    mensaje.textContent = "El número es mayor";
  } else {
    mensaje.textContent = "El número es menor";
  }

  inputNumero.value = "";
});

document.getElementById("btnReiniciar").addEventListener("click", iniciarJuego);

inputNumero.addEventListener("input", () => {
  let valor = "";

  for (let caracter of inputNumero.value) {
    if (caracter >= "0" && caracter <= "9") {
      valor += caracter;
    }
  }

  inputNumero.value = valor;
});

iniciarJuego();