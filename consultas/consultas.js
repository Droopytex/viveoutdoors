// // IMPORTANDO EL MANEJADOR DE ERRORES
// const errors = require("../handleErrors/handleErrors.js");

// importando paquetes instalados necesarios
require("dotenv").config();

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require("../conection/conection");

//variables globales de index.js
let status = "";
let message = "";

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER LAS PUBLICACIONES DE LA BBDD Y SUS CAMPOS RELACIONADOS CON TABLA PRODUCTO E IMAGENES

const leerPublicaciones = async () => {
  const consulta = `SELECT DISTINCT ON (p.id_producto) pub.id_publicacion, pub.fecha_creacion, pub.fecha_actualizacion, pub.estado, p.id_producto, p.nombre AS producto_nombre, p.descripcion AS producto_descripcion, p.stock, p.precio, img.url AS producto_imagen FROM publicaciones pub JOIN productos p ON pub.id_producto = p.id_producto LEFT JOIN imagenes_productos img ON p.id_producto = img.id_producto ORDER BY p.id_producto, img.id_imagen;`;
  try {
    const { rows } = await pool.query(consulta);
    console.log("Publicaciones: ", rows);
    return rows;
  } catch (error) {
    console.error("Error al leer publicaciones:", error);
    throw new Error("No se pudieron obtener las publicaciones");
  }
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UN NUEVO PRODUCTO

const insertarProducto = async (nombre, descripcion, stock, precio) => {
  const consulta = `INSERT INTO productos (id_producto, nombre, descripcion, stock, precio) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;`;
  const values = [nombre, descripcion, stock, precio];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el producto insertado con id generado
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA NUEVA PUBLICACIÓN

const insertarPublicacion = async (id_producto, id_usuario, estado) => {
  const consulta = `INSERT INTO publicaciones (id_publicacion, id_producto, id_usuario, estado, fecha_creacion, fecha_actualizacion) VALUES (DEFAULT, $1, $2, $3, DEFAULT, DEFAULT) RETURNING *;`;
  const values = [id_producto, id_usuario, estado];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación insertada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA NUEVA IMAGEN DE PRODUCTO

const insertarImagenProducto = async (id_producto, url, texto_alternativo) => {
  const consulta = `INSERT INTO imagenes_productos (id_imagen, id_producto, url, texto_alternativo) VALUES (DEFAULT, $1, $2, $3) RETURNING *;`;
  const values = [id_producto, url, texto_alternativo];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la imagen insertada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO
const getProductos = async () => {
  const { rows: productos } = await pool.query("SELECT * FROM productos");
  return productos;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO POR ID (Tengo dudas con esta función)
const getProductoById = async (id_producto) => {
  const { rows } = await pool.query(
    `SELECT p.id_producto, p.nombre, p.descripcion AS descripcion, p.precio, 
              i.url AS foto
       FROM productos p
       LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
       WHERE p.id_producto = $1 LIMIT 1`,
    [id_producto]
  );
  if (rows.length === 0) {
    throw { code: 404, message: "Producto no encontrado" };
  }
  return rows[0];
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO POR CATEGORIAS
const getProductosCategorias = async () => {
  const { rows: productos_categorias } = await pool.query(
    "SELECT * FROM productos_categorias"
  );
  return productos_categorias;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO SALE
const getProductosSale = async () => {
  const { rows: productos_sale } = await pool.query("SELECT * FROM productos_sale WHERE estado = 'activo';");
  return productos_sale;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA ACTUALIZAR ESTADO DE PUBLICACIÓN A INACTIVA
const publicacionInactiva = async (id_publicacion) => {
  const consulta = "UPDATE publicaciones SET estado = $1, fecha_actualizacion = NOW() WHERE id_publicacion = $2 RETURNING *;";
  const values =["Inactivo", id_publicacion];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación actualizada
  };

 //-------------------------------------------------------------------------------------------
// FUNCIÓN PARA ACTUALIZAR ESTADO DE PUBLICACIÓN A ACTIVO
const publicacionActiva = async (id_publicacion) => {
  const consulta = "UPDATE publicaciones SET estado = $1, fecha_actualizacion = NOW() WHERE id_publicacion = $2 RETURNING *;";
  const values =["Activo", id_publicacion];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación actualizada
  };
 
module.exports = {
  leerPublicaciones,
  insertarProducto,
  insertarPublicacion,
  insertarImagenProducto,
  getProductos,
  getProductoById,
  getProductosSale,
  getProductosCategorias,
  publicacionInactiva,
  publicacionActiva
};

//-------------------------------------------------------------------------------------------
// async function obtenerCategorias() {
//     try {
//       const result = await pool.query("SELECT id_categoria, nombre FROM categorias");
//       return result.rows;
//     } catch (error) {
//       throw error;
//     }
//   }
