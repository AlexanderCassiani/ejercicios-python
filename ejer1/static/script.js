const btnProcesar = document.getElementById("procesar");

const btnObtenerNumeros = document.getElementById("obtener-numeros");
const listaNumeros = document.getElementById("lista-numeros");

const mensaje = document.getElementById("mensaje");

btnProcesar.addEventListener("click", async () => {
  const numero = document.getElementById("numero").value;
  listaNumeros.style.display = "none";

  if (!numero) {
    mensaje.textContent = "El campo no puede estar vacio";
    mensaje.classList.add("error");
    return;
  }

  try {
    const respuesta = await fetch("http://127.0.0.1:5000/procesar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numero }),
    });

    const datos = await respuesta.json();

    mensaje.textContent = datos.mensaje;

    if (datos["es par"] === true) {
      mensaje.classList.add("es-par");
      mensaje.classList.remove("es-impar")
    } else {
      mensaje.classList.add("es-impar");
      mensaje.classList.remove("es-par")
    }
  } catch (error) {
    console.error("Ha ocurrido un error ", error);
  }

  mensaje.value = ""
});

btnObtenerNumeros.addEventListener("click", async () => {
  try {
    const respuesta = await fetch("http://127.0.0.1:5000/pares");
    const datos = await respuesta.json();

    const numeros = datos.numeros;

    if (numeros.length === 0) {
      mensaje.textContent = "No hay numeros pares registrado";
      mensaje.classList.add("error");
      return;
    }
    listaNumeros.style.display = "block";
    listaNumeros.innerHTML = "";
    for (let numero of numeros) {
      listaNumeros.innerHTML += `
        <li>${numero}</li>
      `;
    }
  } catch (error) {
    console.error("Ha ocurrido un error", error);
  }

  mensaje.textContent = "";
});
