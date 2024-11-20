//configura y exporta un pool de conexiones a una base de datos PostgreSQL,
//utilizando variables de entorno para la configuración y biblioteca pg
require('dotenv').config();
const { Pool } = require("pg"); //importa la clase Pool de la biblioteca pg

const { HOST, DATABASE, USER, PASSWORD, PORT, PORT_SERVER } = process.env; //extrae las variables de entorno necesarias para la conexión a la base de datos del archivo .env

const pool = new Pool({
  //configuración de la conexión, se crea una instancia de Pool con la configuración necesaria para conectarse a la base de datos PostgreSQL.
  host: HOST,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
  port: PORT || 5432,
  allowExitOnIdle: true, // permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});

const testConnection = async () => {
  try {
    await pool.connect();
    console.log("Conexión a la base de datos exitosa");
  } catch (err) {
    console.error("Error al conectar a la base de datos", err);
    throw err;
  }
};

module.exports = { pool, testConnection, PORT_SERVER };
