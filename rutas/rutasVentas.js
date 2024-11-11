var rutas = require("express").Router();
var { mostrarVentas, nuevaVenta, cambiarEstatus, buscarPorID, borrarVenta } = require("../bd/ventasBD");

// Ruta para mostrar todas las ventas
rutas.get("/mostrarVentas", async (req, res) => {
    const ventasValidas = await mostrarVentas();
    res.json({ ventas: ventasValidas });
});

// Ruta para buscar una venta por ID
rutas.get("/buscarPorId/:id", async (req, res) => {
    const ventaValida = await buscarPorID(req.params.id);
    res.json(ventaValida);
});

// Ruta para cambiar el estatus de una venta
rutas.post("/cambiarEstatus/:id", async (req, res) => {
    const estatusCambiado = await cambiarEstatus(req.params.id);
    res.json({ estatusActualizado: estatusCambiado });
});

// Ruta para borrar una venta
rutas.delete("/borrarVenta/:id", async (req, res) => {
    const ventaBorrada = await borrarVenta(req.params.id);
    res.json({ ventaBorrada });
});

// Ruta para crear una nueva venta
rutas.post("/nuevaVenta", async (req, res) => {
    const ventasValidas = await nuevaVenta(req.body);
    res.json({ ventaCreada: ventasValidas });
});

module.exports = rutas;
