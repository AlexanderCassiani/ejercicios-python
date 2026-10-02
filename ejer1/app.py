from flask import Flask, render_template, request, jsonify
from conexion import conectar_db


class API:
    app = Flask(__name__)

    @staticmethod
    def insertar(numero):
        conexion = conectar_db()
        cursor = conexion.cursor()
        cursor.execute("INSERT INTO numeros (numero) VALUES (%s)", (numero,))
        conexion.commit()
        cursor.close()
        conexion.close()

    @staticmethod
    def seleccionar():
        conexion = conectar_db()
        cursor = conexion.cursor()
        cursor.execute("SELECT DISTINCT numero FROM numeros")
        numeros = cursor.fetchall()
        cursor.close()
        conexion.close()
        return [fila[0] for fila in numeros]

    @staticmethod
    def eliminar_todo():
        conexion = conectar_db()
        cursor = conexion.cursor()
        cursor.execute("TRUNCATE numeros")
        conexion.commit()
        cursor.close()
        conexion.close()

    @app.route("/")
    def inicio():
        return render_template("index.html")

    @app.route("/procesar", methods=["POST"])
    def procesar():
        dato = request.json

        if not dato:
            return jsonify({
                "mensaje": "El campo es obligatorio"
            })

        numero = int(dato["numero"])

        if numero % 2 == 0:
            API.insertar(numero)

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
        numeros = API.seleccionar()

        return jsonify({
            "numeros": numeros
        })

    @app.route("/eliminar-pares", methods=["DELETE"])
    def eliminar_pares():
        API.eliminar_todo()

        return jsonify({
            "mensaje": "Datos eliminados correctamente"
        })

API.app.run()