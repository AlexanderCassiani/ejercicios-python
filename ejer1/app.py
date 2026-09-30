from flask import Flask, render_template, request, jsonify
from conexion import conectar_db

app = Flask(__name__)

@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/procesar", methods=["POST"])
def procesar():
    dato = request.json
    
    if(not dato):
        return jsonify({
            "mensaje": "El campo es obligatorio"
        })

    numero = int(dato["numero"])

    if numero % 2 == 0:
        conexion = conectar_db()
        cursor = conexion.cursor()

        cursor.execute("INSERT INTO numeros (numero) VALUES (%s)", (numero,))
        conexion.commit()

        cursor.close()
        conexion.close()

        return jsonify({
            "es par": True,
            "numero": numero,
            "mensaje": f"El numero {numero} es par"
        })
    else:
        return jsonify({
            "es par": False,
            "numero": numero,
            "mensaje": f"El numero {numero} es impar"
        })

@app.route("/pares", methods=["GET"])
def obtener_numeros_pares():
    conexion = conectar_db()
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM numeros")

    numeros = cursor.fetchall()
    cursor.close()
    conexion.close()

    numeros = [fila[0] for fila in numeros]

    return jsonify({
        "numeros": numeros
    })

@app.route("/eliminar-pares", methods=["DELETE"])
def eliminar_pares():
    conexion = conectar_db()
    cursor = conexion.cursor()

    cursor.execute("TRUNCATE numeros")
    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Datos eliminados correcamente"
    })

app.run()