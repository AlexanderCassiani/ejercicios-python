import mysql.connector

def conectar_db():
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        database="par_o_impar",
        password="Alex 2008#"
    )
    print("Conexion a la bd establecida exitosamente")

    return conexion