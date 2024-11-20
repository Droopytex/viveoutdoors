const request = require("supertest");
const app = require("../index"); // Asegúrate de que la ruta sea correcta
const { pool, testConnection } = require("../conection/conection"); // Si necesitas la conexión a la base de datos
let server;

describe("API Endpoints", () => {
  beforeAll(() => {
    // await testConnection();
    server = app.listen();
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    console.log("Server successfully closed");
  });

describe("POST /registro", () => {
    it("debería registrar un nuevo usuario", async () => {
      const response = await request(server).post("/registro").send({
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@example.com",
        telefono: "123456789",
        password: "123456",
        rol: "cliente",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id_usuario");
      expect(response.body).toHaveProperty("rol", "cliente");
    });

    it("debería devolver un error si el usuario ya existe", async () => {
      const response = await request(server).post("/registro").send({
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@example.com",
        telefono: "123456789",
        password: "123456",
        rol: "cliente",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "El usuario ya existe con este correo electrónico"
      );
    });
  });

  describe("POST /login", () => {
    it("debería iniciar sesión con credenciales válidas", async () => {
      const response = await request(server).post("/login").send({
        email: "juan@example.com",
        password: "123456",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("id_usuario");
    });

    it("debería devolver un error con credenciales inválidas", async () => {
      const response = await request(server).post("/login").send({
        email: "juan@example.com",
        password: "wrongpassword",
      });
      expect(response.status).toBe(401);
      expect(response.text).toBe("Credenciales inválidas");
    });
  });

describe("POST /logout", () => {
    it("debería cerrar sesión", async () => {
      const response = await request(server)
        .post("/logout")
        .set("Cookie", "access_token=token_de_prueba"); // Asegúrate de usar un token de prueba si es necesario
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Sesión cerrada exitosamente"
      );
    });
  });

 describe("GET /publicaciones", () => {
    it("debería obtener publicaciones", async () => {
      const response = await request(server).get("/publicaciones").send();
      console.log(response, "este es el response");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("obtenerPublicaciones");
    });
  });
describe("POST /crearpublicacion", () => {
    it("debería crear una nueva publicación", async () => {
      const response = await request(server).post("/crearpublicacion").send({
        nombre: "Producto Test",
        descripcion: "Descripción del producto",
        stock: 10,
        precio: 100,
        url: "http://example.com/image.jpg",
        texto_alternativo: "Imagen del producto",
        id_usuario: 1, // Asegúrate de usar un ID de usuario válido
        estado: "activo",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "mensaje",
        "Publicación creada exitosamente"
      );
    });
  });
});