

# Vive Outdoors - Hito 3 Entrega Backend

**Vive Outdoors** es una tienda virtual dedicada a los amantes de la naturaleza y las actividades al aire libre. Nuestro objetivo es ofrecer una amplia gama de productos para que disfrutes de tus aventuras al máximo.

## Integrantes del Proyecto

- **Andrés Velásquez**
- **Andrea Rosero**
- **Lorena Suárez**

## Descripción del Proyecto

Este proyecto está realizado como parte del desafío final de **Desarrollador Full Stack JS** en **Desafío Latam**. A través de esta tienda virtual, los usuarios podrán explorar y adquirir productos relacionados con actividades al aire libre, como carpas, sacos y colchones, mochilas y accesorios.

## Requerimientos solicitado:

- Crear un nuevo proyecto npm
- Instalar las dependencias descritas en el primer hito
- Crear las diferentes rutas según el esquema definido en el primer hito
- Levanar la API Rest capaz de gestionar los datos de la bbdd Postgre SQL
- Implementar la autenticación y autorización con jwt
- Usar el paquete supertest para hacerle pruebas a las diferentes rutas de la API Rest

  
## Instalación del Backend

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Droopytex/viveoutdoors
   cd viveoutdoors/backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias, como la conexión a la base de datos y la clave secreta para JWT.

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

## Imágenes del Desarrollo logrado

Ruta Post /login, da acceso al usuario a su cuenta: 
 
![Captura de pantalla 2024-11-16 232225](https://github.com/user-attachments/assets/7ba5e922-b08c-4c2a-a1c2-e18c970e7d99)


Ruta POST /crearpublicacion esta ruta hace el ingreso de datos a tres tablas: 

![Captura de pantalla 2024-11-16 211534](https://github.com/user-attachments/assets/b1051b37-5fde-4149-a10f-aad99ad8d5a0)


Secuencia de uso de rutas PUT donde se actualiza el campo estado de las publicaciones, se aprecia que inicialmente la publicación 8 está desactiva, luego pasa a estar activada y se hace una prueba con la publicación 7 para que cambie su estado a inactiva:

![Captura de pantalla 2024-11-17 155746](https://github.com/user-attachments/assets/b663dd3f-f759-44e9-bc4b-225bd8f348b5)

![Captura de pantalla 2024-11-17 155800](https://github.com/user-attachments/assets/904e59a2-890e-48d3-8e19-cdc19e84f7f9)

![Captura de pantalla 2024-11-17 155823](https://github.com/user-attachments/assets/518a582d-d4a0-47df-b38f-5232c69702c3)

![Captura de pantalla 2024-11-17 155930](https://github.com/user-attachments/assets/37e9770a-4afb-4e3f-b63f-3b6875bbc4f2)


Ruta Get de categorias_productos: Muestra las categorías y los productos en cada una de ellas.

![Captura de pantalla 2024-11-17 163701](https://github.com/user-attachments/assets/21e96532-e355-4e2c-82b7-ec372d0a1d27)


Ruta Get de productos en descuento: Muestra solo los productos que tienen el campo sale como "activo":

![Captura de pantalla 2024-11-17 163911](https://github.com/user-attachments/assets/c2d28a32-269c-403d-92f6-10300d6027ba)



## Contribuciones

Si deseas contribuir a este proyecto, no dudes en hacer un fork y enviar un pull request. ¡Cualquier mejora es bienvenida!

## Contacto

Para más información, puedes contactarnos a través de nuestras redes sociales o correos electrónicos.

---

# viveoutdoors

---

Si necesitas más ajustes o información adicional, ¡házmelo saber!
