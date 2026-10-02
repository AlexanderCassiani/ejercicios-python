import random
from flask import Flask, render_template, jsonify
from conexion import conectar_db


class API:
    app = Flask(__name__)

    def insertar(numero):
        conexion = conectar_db()
        cursor = conexion.cursor()
        cursor.execute("INSERT INTO numeros (numero) VALUES (%s)", (numero,))
        conexion.commit()
        cursor.close()
        conexion.close()

    @app.route("/")
    def inicio():
        return render_template("index.html")

    @app.route("/numero", methods=["GET"])
    def obtener_numero():
        numero = random.randint(1, 100)

        API.insertar(numero)

        return jsonify({
            "numero": numero
        })


API.app.run()