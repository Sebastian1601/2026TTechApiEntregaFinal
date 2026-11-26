# 2026TTechApiEntregaFinal
API con autenticación, crud con express, jwt, firebase.

## Carpeta oficial de la entrega del proyecto NodeJS backend de TalentoTech

Módulos instalados:
- Express
- Cors
- JSon Web Token
- dotEnv
- Firebase


## Instalación
`npm init -y`


## Instalar dependencias
`npm install`


## Estructura de carpetas

│
├ node_modules
├ RestClientTest `archivos de pruebas a los endpoints`
├ src
│ ├ config 
│ ├ controllers
│ ├ middlewares
│ ├ models
│ ├ routes
  └ services

## Estructura de item de colección productos

```json
{
    "title":"titulo del producto",
    "price": precioINT64,
    "stock": stockINT64
}
```

## Pruebas con POSTMAN

Para las pruebas con Postman, se crean 2 colecciones, una para Autenticación, y otra para productos.
Se adjuntan en la carpeta *postman* las 2 colecciones y se crea un environment o entorno con las variables que utilizan dichas peticiones en su confección.

## Datos para probar login

archivo .env ->
**DEMO_EMAIL**:"user@mailserver.com",
**DEMO_PASSWORD**:"87654321"
