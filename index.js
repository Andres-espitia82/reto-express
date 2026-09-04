const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// CREAR  BASE DE DATOS SIMULADA
const productos = [
  { id: 1, nombre: 'laptop hp', precio: 2500000, categoria: 'tecnologia' },
  {
    id: 2,
    nombre: 'mouse inalambrico',
    precio: 60000,
    categoria: 'tecnologia',
  },
  { id: 3, nombre: 'diadema gamer', precio: 154571, categoria: 'tecnologia' },
];

// Endpoint 1: Verificación de estado del servidor
app.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
    mensaje: 'Servidor Backend CUN ejecutándose correctamente',
    timestamp: new Date(),
  });
});

// Endpoint 2: Obtener todos los productos
app.get('/api/v1/productos', (req, res) => {
  res.status(200).json({
    success: true,
    total: productos.length,
    data: productos,
  });
});

// CREAR ENDPOINTS
app.get('/api/v1/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Error 400: Bad Request (si envían algo que no es un número)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'El ID proporcionado no es válido' });
  }

  const producto = productos.find((p) => p.id === id);

  // Si no encuentra el producto (ejemplo: ID 301)
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Si lo encuentra, devuelve el detalle del producto
  res.status(200).json(producto);
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
