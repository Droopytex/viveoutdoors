// user-repository.js
//maneja la creación y autenticación de usuarios en una base de datos.

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require("../conection/conection");
const bcrypt = require('bcryptjs');
// const crypto = require('crypto'); // no está siendo usado , se peude borrar


// UserRepository verifica si el usuario existe, hashea la contraseña, genera un ID único e inserta el nuevo usuario en la base de datos
class UserRepository {  
    static async create({ nombre, apellido, email, telefono, password}) {
        // Verificar si el usuario ya existe
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new Error('El correo electrónico ya existe');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // Puedes ajustar el número de saltos

        // Insertar el nuevo usuario en la base de datos
        const resultado = await pool.query('INSERT INTO usuarios (id_usuario, nombre, apellido, email, telefono, password, rol) VALUES (DEFAULT, $1, $2, $3, $4, $5, DEFAULT) RETURNING *', [nombre, apellido, email, telefono, hashedPassword]);
        console.log ("usuario: ", resultado); // muestra en consola el usuario registrado
        return resultado.rows[0]; // retorna la información del usuario
    }

    static async login({ email, password }) {
        // Buscar el usuario por nombre de usuario
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('El correo electrónico no ha sido registrado');
        }

        // Verificar la contraseña
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Contraseña incorrecta, intente nuevamente.');
        }

        // Retornar el usuario sin la contraseña
        const { password: _, ...publicUser } = user;
        return publicUser;
    }
}

module.exports =  UserRepository ;