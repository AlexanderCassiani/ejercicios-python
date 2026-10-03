Requisitos para ejecutar los ejercicios 

- Python instalado
- MySQL instalado

1. Crear el entorno virtual

python -m venv venv

Activar el entorno virtual en Windows:

venv\Scripts\activate

2. Instalar las dependencias

Con el entorno virtual activado:

pip install flask mysql-connector-python

3. Configurar la conexión a MySQL

Abre el archivo:

conexion.py

y configura los datos de conexión a tu base de datos:

mysql.connector.connect(
    host="localhost",
    user="TU_USUARIO",
    password="TU_CONTRASEÑA",
    database="par_o_impar"
)

Reemplaza "TU_USUARIO", "TU_CONTRASEÑA" con los datos de tu instalación de MySQL.

4. Ejecutar la aplicación

Con el entorno virtual activado:

python app.py

La aplicación estará disponible en:

http://127.0.0.1:5000
