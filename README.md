# FBI System - ADL

## Requerimientos originales

1. Crear una ruta que autentique a un agente basado en sus credenciales y genera un
token con sus datos.

2. Al autenticar un agente, devolver un HTML que:
 - Muestre el email del agente autorizado.
 - Guarde un token en SessionStorage con un tiempo de expiración de 2
minutos.
 - Disponibiliza un hiperenlace para redirigir al agente a una ruta restringida.
3. Crear una ruta restringida que devuelva un mensaje de Bienvenida con el correo del
agente autorizado, en caso contrario devolver un estado HTTP que indique que el
usuario no está autorizado y un mensaje que menciona la descripción del error.

## Mayores diferencias con el desafío original

- Se cambio los datos de los agentes y se almacenó en un JSON
- El token se almacena en una **cookie**
- Se utiliza el motor de plantillas **handlebars**
- El SECRET y el TTL del **JWT** se obtienen de un **.env**
- Un **middleware** restringe las rutas que empiecen con underscore
- Hay una ruta para cerrar sesión

## Estructura del proyecto
```plain
├── data
│   └── agentes.json
├── .env
├── server.js
└── views
    ├── error.handlebars
    ├── home.handlebars
    ├── layouts
    │   └── main.handlebars
    └── login.handlebarss
```
## Módulos utilizados

- express
- express-handlebars
- body-parser
- jsonwebtoken
- cookie-parser
- dotenv

