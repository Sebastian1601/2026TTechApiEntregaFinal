# Referencia de API — 2026TTechApiEntregaFinal

Documentación completa de todos los endpoints disponibles en la API. Esta API permite gestionar la autenticación de usuarios y el catálogo de productos.

**URL Base:** `{{url}}`

---

## Tabla de Contenidos

1. [Variables de Entorno](#variables-de-entorno)
2. [Autenticación](#autenticación)
   - [POST /auth/login — Autenticarse](#post-authlogin--autenticarse)
3. [Productos](#productos)
   - [GET /products — Obtener todos los productos](#get-products--obtener-todos-los-productos)
   - [GET /products/:id — Obtener producto por ID](#get-productsid--obtener-producto-por-id)
   - [POST /products/create — Crear producto](#post-productscreate--crear-producto)
   - [DELETE /products/:id — Eliminar producto](#delete-productsid--eliminar-producto)

---

## Variables de Entorno

Estas variables deben estar configuradas en el entorno activo de Postman antes de ejecutar las solicitudes.

| Variable | Descripción | Ejemplo |
|---|---|---|
| `url` | URL base del servidor | `http://localhost:3000` |
| `bearerToken` | JWT obtenido del endpoint de login | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `_idProducto` | ID de producto para consultas | `64a1f2c3e4b5d6f7a8b9c0d1` |
| `productTitle` | Título del producto a crear | `Laptop Pro 15` |
| `productPrice` | Precio del producto a crear | `1299.99` |
| `productStock` | Stock del producto a crear | `50` |
| `_idProductoEliminar` | ID de producto a eliminar | `64a1f2c3e4b5d6f7a8b9c0d2` |

---

## Autenticación

Los endpoints protegidos requieren un **Bearer Token** en el encabezado `Authorization`. El token se obtiene mediante el endpoint de login y tiene una validez de **15 minutos**.

### `POST` /auth/login — Autenticarse

Autentica a un usuario con sus credenciales y devuelve un token JWT.

**URL:** `{{url}}/auth/login`

#### Encabezados de la solicitud

| Encabezado | Valor |
|---|---|
| `Content-Type` | `application/json` |

#### Cuerpo de la solicitud

```json
{
  "email": "user@mailserver.com",
  "password": "87654321"
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `email` | `string` | Correo electrónico del usuario |
| `password` | `string` | Contraseña del usuario |

#### Respuestas

| Código | Estado | Descripción | Cuerpo de respuesta |
|---|---|---|---|
| `200` | OK | Autenticación exitosa. Token válido por 15 minutos. | `{ "token": "<jwt_token>" }` |
| `401` | Unauthorized | Credenciales incorrectas. | `{ "error": "Credenciales incorrectas" }` |
| `422` | Unprocessable Entity | Faltan campos obligatorios. | `{ "error": "Email y password son necesarios" }` |

---

## Productos

Endpoints para la gestión del catálogo de productos. Algunos endpoints requieren autenticación mediante Bearer Token.

### `GET` /products — Obtener todos los productos

Devuelve la lista completa de todos los productos disponibles en la base de datos.

**URL:** `{{url}}/products`

**Autenticación:** No requerida

#### Respuestas

| Código | Estado | Descripción | Cuerpo de respuesta |
|---|---|---|---|
| `200` | OK | Lista de productos obtenida exitosamente. | Array de objetos producto |
| `500` | Internal Server Error | Error al consultar la base de datos. | `{ "message": "Error al obtener datos desde la base." }` |

---

### `GET` /products/:id — Obtener producto por ID

Devuelve la información de un producto específico según su ID.

**URL:** `{{url}}/products/{{_idProducto}}`

**Autenticación:** No requerida

#### Parámetros de ruta

| Parámetro | Tipo | Descripción |
|---|---|---|
| `id` | `string` | ID único del producto |

#### Respuestas

| Código | Estado | Descripción | Cuerpo de respuesta |
|---|---|---|---|
| `200` | OK | Producto encontrado exitosamente. | Objeto producto |
| `400` | Bad Request | El ID proporcionado no tiene un formato válido. | `{ "message": "ID inválido" }` |
| `404` | Not Found | No existe un producto con el ID indicado. | `{ "message": "No se encontró producto con id indicada" }` |
| `500` | Internal Server Error | Error al consultar la base de datos. | `{ "message": "Error al obtener producto." }` |

---

### `POST` /products/create — Crear producto

Crea un nuevo producto en la base de datos. Requiere autenticación.

**URL:** `{{url}}/products/create`

**Autenticación:** Bearer Token (`{{bearerToken}}`)

#### Encabezados de la solicitud

| Encabezado | Valor |
|---|---|
| `Authorization` | `Bearer {{bearerToken}}` |
| `Content-Type` | `application/json` |

#### Cuerpo de la solicitud

```json
{
  "title": "{{productTitle}}",
  "price": {{productPrice}},
  "stock": {{productStock}}
}
```

| Campo | Tipo | Validación | Descripción |
|---|---|---|---|
| `title` | `string` | Mínimo 4 caracteres | Nombre o título del producto |
| `price` | `number` | Mínimo 1 | Precio del producto |
| `stock` | `number` | Mínimo 1 | Cantidad disponible en inventario |

#### Respuestas

| Código | Estado | Descripción | Cuerpo de respuesta |
|---|---|---|---|
| `200` | OK | Producto creado exitosamente. | `{ "ok": true, "productId": "<id>" }` |
| `400` | Bad Request | Los datos enviados no cumplen las validaciones. | `{ "message": "Los datos de titulo, precio o stock son inválidos. verificar." }` |
| `500` | Internal Server Error | Error al guardar el producto en la base de datos. | `{ "message": "Se generó un error al crear el nuevo producto en la base." }` |

---

### `DELETE` /products/:id — Eliminar producto

Elimina un producto de la base de datos según su ID. Requiere autenticación.

**URL:** `{{url}}/products/{{_idProductoEliminar}}`

**Autenticación:** Bearer Token (`{{bearerToken}}`)

#### Encabezados de la solicitud

| Encabezado | Valor |
|---|---|
| `Authorization` | `Bearer {{bearerToken}}` |

#### Parámetros de ruta

| Parámetro | Variable Postman | Tipo | Descripción |
|---|---|---|---|
| `id` | `{{_idProductoEliminar}}` | `string` | ID único del producto a eliminar |

#### Respuestas

| Código | Estado | Descripción | Cuerpo de respuesta |
|---|---|---|---|
| `200` | OK | Producto eliminado exitosamente. | `{ "message": "Producto Eliminado." }` |
| `500` | Internal Server Error | Error al eliminar el producto de la base de datos. | `{ "message": "Error al eliminar producto." }` |

---

*Documentación generada para el proyecto 2026TTechApiEntregaFinal.*
