# 🎥 Plataforma de Video Bajo Demanda (VBD)

Desarrollo de un **Producto Mínimo Viable (PMV)** en **PHP** utilizando el patrón **MVC**. La plataforma permite gestionar un catálogo de contenidos (películas, documentales y series) y los artistas asociados, con conexión a una base de datos **MySQL**.

---

## ✨ Funcionalidades

### 1. 🎭 Gestión de Artistas
- Registro de nuevos artistas con:
  - 📝 Campo de texto para introducir el nombre del artista.
  - ➕ Botón para agregar el artista a la base de datos.
  - 📋 Listado dinámico que muestra todos los artistas registrados.
- Los datos se actualizan automáticamente en la interfaz al insertar un nuevo artista.
- **Seguridad**: Peticiones asíncronas con promesas para prevenir inyecciones SQL.

---

### 2. 📺 Gestión de Contenidos
- Registro de nuevos contenidos (películas, documentales, series) con:
  - 📝 Campo de texto para introducir el título del contenido.
  - ➕ Botón para agregar el contenido a la base de datos.
  - 📋 Listado dinámico que muestra todos los contenidos registrados.
- Los datos se actualizan automáticamente en la interfaz al insertar un nuevo contenido.
- **Seguridad**: Peticiones asíncronas con promesas para prevenir inyecciones SQL.

---

### 3. 🔗 Relación entre Artistas y Contenidos
- Asociación de artistas con contenidos existentes:
  - 📋 Listado de contenidos con los artistas asociados.
  - 🔧 Interfaz para vincular artistas a contenidos específicos.
- Los datos se actualizan automáticamente al realizar una nueva asociación.
- **Seguridad**: Peticiones asíncronas con promesas para prevenir inyecciones SQL.

---

## 🛠️ Requisitos
- PHP 7.4+  
- Servidor web con soporte para PHP (e.g., Apache, Nginx).  
- MySQL 5.7+.  
- Navegador moderno con soporte para JavaScript.

---

