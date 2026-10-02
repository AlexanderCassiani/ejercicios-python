from flask import Flask, render_template, request, jsonify
from conexion import conectar_db


class API:
    app = Flask(__name__)

    @staticmethod
    def insertar(numero):
        conexion = conectar_db()
        cursor = conexion.cursor()
        cursor.execute("INSERT INTO tablas (tabla) VALUES (%s)", (numero,))
        conexion.commit()
        cursor.close()
        conexion.close()

    @staticmethod
    def eliminar_todo():
        conexion = conectar_db()
        cursor = conexion.cursor()
        cursor.execute("TRUNCATE tablas")
        conexion.commit()
        cursor.close()
        conexion.close()

    @app.route("/")
    def inicio():
        return render_template("index.html")

    @app.route("/tablas", methods=["POST"])
    def guardar_tabla():
        dato = request.json

        if not dato:
            return jsonify({
                "mensaje": "El campo es obligatorio"
            })

        numero = int(dato["numero"])

        API.insertar(numero)

        return jsonify({
            "numero": numero,
            "mensaje": f"La tabla del {numero} se guardó correctamente"
        })

    @app.route("/tablas", methods=["DELETE"])
    def eliminar_tablas():
        API.eliminar_todo()

        return jsonify({
            "mensaje": "Datos eliminados correctamente"
        })
        
API.app.run()