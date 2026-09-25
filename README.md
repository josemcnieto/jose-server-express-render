# server-express-render

Servidor Express simple con ES modules que expone una API JSON de libros.

## Requisitos

- Node.js v24 o superior
- npm

## Instalación

```bash
npm install
```

## Uso

```bash
npm start
```

El servidor escucha en `http://localhost:3000`. El puerto se puede cambiar con la
variable de entorno `PORT`:

```bash
PORT=8080 npm start
```

## Endpoints

| Método | Ruta                        | Descripción                                        |
| ------ | --------------------------- | -------------------------------------------------- |
| GET    | `/`                         | Mensaje de bienvenida e índice de endpoints         |
| GET    | `/books`                    | Listado completo de libros                          |
| GET    | `/books/:id`                | Libro por id (`404` si no existe)                  |
| GET    | `/search?q=&limit=`         | Búsqueda por título, autor o editorial, con límite opcional |

Ejemplos:

```bash
curl http://localhost:3000/books
curl http://localhost:3000/books/1
curl "http://localhost:3000/search?q=orwell&limit=5"
```

Los datos son un array en memoria definido en `index.js`, sin base de datos.

## CORS

El servidor usa el middleware [`cors`](https://github.com/expressjs/cors) para
permitir que otros orígenes (frontends en otro puerto, dominios, etc.) consuman la
API. Está registrado antes de las rutas, así que aplica a todos los endpoints y
responde automáticamente a los preflight `OPTIONS`.

Los orígenes permitidos se configuran con la variable de entorno `CORS_ORIGIN`,
que acepta una lista separada por comas:

```bash
CORS_ORIGIN="http://localhost:5173,https://miapp.com" npm start
```

Comportamiento:

- **`CORS_ORIGIN` sin definir (por defecto):** se refleja el origen de la petición,
  por lo que cualquier origen puede consumir la API. Pensado para desarrollo.
- **`CORS_ORIGIN` con lista:** solo esos orígenes reciben la cabecera
  `Access-Control-Allow-Origin`. Cualquier otro origen queda bloqueado.
- El comodín `*` en la lista equivale a permitir todos los orígenes.

Ejemplo en `.env` (ignorado por git):

```
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## Estructura

```
.
├── index.js        # entry point: app de Express, rutas y CORS
├── package.json
└── package-lock.json
```

## Stack

- Express 5
- ES modules (`"type": "module"`)
