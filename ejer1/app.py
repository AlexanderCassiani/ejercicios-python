from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/procesar", methods=["POST"])
def procesar():
    dato = request.json

    numero = int(dato["numero"])
    
    if(not(dato)):
        return jsonify({
            "mensaje": "El campo es obligatorio"
        })

    if numero % 2 == 0:
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

app.run()