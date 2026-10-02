const inputNumero = document.getElementById("numero");
const tabla = document.getElementById("tabla");

document.getElementById("btnGenerar").addEventListener("click", async () => {
  const respuesta = await fetch("/tablas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero: inputNumero.value }),
  });

  const datos = await respuesta.json();

  tabla.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    tabla.innerHTML += `
            <span>${datos.numero} x ${i} = ${datos.numero * i}</span>
        `;
  }
});

document.getElementById("btnEliminar").addEventListener("click", async () => {
  const respuesta = await fetch("/tablas", { method: "DELETE" });
  const datos = await respuesta.json();

  tabla.innerHTML = "";
});

inputNumero.addEventListener("input", () => {
  let valor = "";

  for (let caracter of inputNumero.value) {
    if (caracter >= "0" && caracter <= "9") {
      valor += caracter;
    }
  }

  inputNumero.value = valor;
});
