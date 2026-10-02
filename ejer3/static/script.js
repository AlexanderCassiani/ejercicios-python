const inputNumero = document.getElementById("numero");
const mensaje = document.getElementById("mensaje");
const textoIntentos = document.getElementById("intentos");
const modalFinal = document.getElementById("modalFinal");

let numeroSecreto = 0;
let intentos = 0;

async function iniciarJuego() {
  try {
    const respuesta = await fetch("/numero");
    const datos = await respuesta.json();

    numeroSecreto = datos.numero;
    intentos = 0;

    inputNumero.value = "";
    mensaje.textContent = "Adivina el número entre 1 y 100";
    textoIntentos.textContent = "Intentos: 0";
    modalFinal.hidden = true;
    inputNumero.disabled = false;
    document.getElementById("btnAdivinar").disabled = false;
    inputNumero.focus();
  } catch (error) {
    mensaje.textContent = "No se pudo iniciar el juego. Inténtalo de nuevo.";
    console.error(error);
  }
}

document.getElementById("btnAdivinar").addEventListener("click", () => {
  if (inputNumero.value === "" || numeroSecreto === 0) {
    return;
  }

  const numero = parseInt(inputNumero.value);
  intentos++;
  textoIntentos.textContent = `Intentos: ${intentos}`;

  if (numero === numeroSecreto) {
    mensaje.textContent = `¡Correcto! Lo adivinaste en ${intentos} intentos`;
    modalFinal.hidden = false;
    document.getElementById("btnAdivinar").disabled = true;
    inputNumero.disabled = true;
    document.getElementById("btnReiniciarModal").focus();
  } else if (numero < numeroSecreto) {
    mensaje.textContent = "El número es mayor";
  } else {
    mensaje.textContent = "El número es menor";
  }

  inputNumero.value = "";
});

document.getElementById("btnReiniciar").addEventListener("click", iniciarJuego);
document.getElementById("btnReiniciarModal").addEventListener("click", iniciarJuego);

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