## Instalación y ejecución

### Requisitos
Es necesario instalar las siguientes dependencias:

```bash
npm install axios
npm install @types/js-cookie
npm run dev
```
# Pokémon E-commerce

## Proyecto general
**¿Cómo se llama tu proyecto?**  
El nombre del proyecto es **Pokémon E-commerce**.

**¿Cuál es el objetivo del proyecto?**  
El propósito de este proyecto es aprender a usar Next.js con TypeScript y Tailwind CSS, además de comprender más a fondo lo que implica el desarrollo de aplicaciones web completas, incluyendo la interacción con una base de datos y autenticación.

**¿Es un proyecto de portafolio, escolar o personal?**  
Este proyecto fue una prueba técnica para una empresa.

---

## 🧪 Tecnologías usadas

### Frontend
- **Next.js**: Framework para React que facilita la creación de aplicaciones web con renderizado del lado del servidor.
- **Tailwind CSS**: Framework de CSS para una estilización rápida y eficiente.

### Backend
- **Express**: Framework de Node.js para manejar las rutas, controladores y la lógica del backend.

### Base de Datos
- **Neon (Serverless PostgreSQL)**: Plataforma serverless para almacenar la base de datos en PostgreSQL.

---

## 🔐 Funcionalidades

### Autenticación
El sistema usa **JWT** para la autenticación de usuarios. Además, se utiliza **bcryptjs** para encriptar las contraseñas de los usuarios de manera segura.

### Funcionalidades principales
- Los usuarios pueden **registrarse**, **iniciar sesión** y **ver su perfil**.
- Pueden **buscar productos** (Pokémon) por nombre.
- Los usuarios pueden **ver los detalles** de cada producto y **agregarlos al carrito** de compras.

---

## 🧩 Integraciones y lógica

### Uso de la PokéAPI
La PokéAPI se utiliza para obtener información sobre los Pokémon, como nombres, imágenes y detalles de cada uno. Los datos se consumen en **tiempo real** mediante peticiones a la API, asegurando que la información esté siempre actualizada.

### Manejo de compras y carrito
El carrito de compras está ligado a la cuenta del usuario. Los productos seleccionados se almacenan en **cookies** para mantener el estado del carrito. Los usuarios pueden agregar y eliminar productos de su carrito antes de proceder al pago ficticio.

---

## 🚀 Extras o detalles técnicos

### Despliegue
La aplicación estará desplegada en **Vercel** para su acceso público.

### Retos y aprendizajes
Uno de los mayores retos durante el desarrollo fue manejar la estructura del proyecto de manera adecuada, especialmente porque no se tenía mucha experiencia con **Next.js**. Además, la implementación de las cookies para mantener la sesión del usuario fue otro desafío importante.

---


