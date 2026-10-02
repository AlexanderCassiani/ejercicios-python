import mysql.connector

def conectar_db():
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        database="tablas_de_multiplicacion",
        password=""
    )
    print("Conexion a la bd establecida exitosamente")

    return conexion