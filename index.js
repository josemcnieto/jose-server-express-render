import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const books = [
  { id: 1, libro: "Cien años de soledad", autor: "Gabriel García Márquez", editorial: "Sudamericana", anio: 1967 },
  { id: 2, libro: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", editorial: "Francisco de Robles", anio: 1605 },
  { id: 3, libro: "1984", autor: "George Orwell", editorial: "Secker & Warburg", anio: 1949 },
  { id: 4, libro: "El principito", autor: "Antoine de Saint-Exupéry", editorial: "Reynal & Hitchcock", anio: 1943 },
];

app.get("/", (req, res) => {
  res.json({
    message: "hola mundo",
    endpoints: {
      "GET /": "Lista de endpoints disponibles",
      "GET /books": "Listado de libros",
      "GET /books/:id": "Libro por id",
      "GET /search?q=&limit=": "Búsqueda de libros por título, autor o editorial",
    },
  });
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  res.json(book);
});

app.get("/search", (req, res) => {
  const { q, limit } = req.query;
  const term = (q || "").toLowerCase();
  let results = books.filter(
    (b) =>
      b.libro.toLowerCase().includes(term) ||
      b.autor.toLowerCase().includes(term) ||
      b.editorial.toLowerCase().includes(term)
  );
  if (limit) {
    results = results.slice(0, Number(limit));
  }
  res.json(results);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});