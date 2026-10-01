const btnProcesar = document.getElementById("procesar");

const btnObtenerNumeros = document.getElementById("obtener-numeros");
const listaNumeros = document.getElementById("lista-numeros");

const contenedorLista = document.getElementById("contenedor-lista");
const btnBorrarNumeros = document.getElementById("borrar-numeros");

const mensaje = document.getElementById("mensaje");

contenedorLista.style.display = "none";

async function comprobarNumero() {
  const numero = document.getElementById("numero").value;
  contenedorLista.style.display = "none";

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
      mensaje.classList.remove("es-impar");
    } else {
      mensaje.classList.add("es-impar");
      mensaje.classList.remove("es-par");
    }
  } catch (error) {
    console.error("Ha ocurrido un error: ", error);
  }

  document.getElementById("numero").value = "";
}

function actualizarLista(numeros) {
  listaNumeros.innerHTML = "";
  for (let numero of numeros) {
    listaNumeros.innerHTML += `
        <li>${numero}</li>
      `;
  }
}

let numeros;

async function obtenerNumeros() {
  try {
    const respuesta = await fetch("http://127.0.0.1:5000/pares");
    const datos = await respuesta.json();

    numeros = datos.numeros;

    if (numeros.length === 0) {
      mensaje.textContent = "No hay numeros pares registrado";
      mensaje.classList.add("error");
      mensaje.classList.remove("es-par", "es-impar");
      return;
    }
    contenedorLista.style.display = "block";
    actualizarLista(numeros);
  } catch (error) {
    console.error("Ha ocurrido un error: ", error);
  }

  mensaje.textContent = "";
}

async function eliminarNumeros() {
  try {
    const respuesta = await fetch("http://127.0.0.1:5000/eliminar-pares", {
      method: "DELETE",
    });
    const datos = await respuesta.json();

    console.log(datos);
  } catch (error) {
    console.error("Ha ocurrido un error: ", error);
  }

  listaNumeros.innerHTML = "";
  contenedorLista.style.display = "none";
}

btnProcesar.addEventListener("click", comprobarNumero);
btnObtenerNumeros.addEventListener("click", obtenerNumeros);
btnBorrarNumeros.addEventListener("click", eliminarNumeros);
