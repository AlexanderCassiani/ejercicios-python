import mysql.connector

def conectar_db():
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        database="par_o_impar",
        password=""
    )
    print("Conexion a la bd establecida exitosamente")

    return conexion