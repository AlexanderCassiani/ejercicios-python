const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", async () => {
  const numero = document.getElementById("numero").value;

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
    } else {
      mensaje.classList.add("es-impar");
    }
  } catch (error) {
    console.error("Ha ocurrido un error ", error);
  }
});
