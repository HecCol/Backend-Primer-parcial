var rutas = require("express").Router();
var { mostrarVentas, nuevaVenta, estadoVenta, buscarPorID } = require("../bd/ventaBD");

// Ruta para mostrar ventas
rutas.get("/mostrarVentas", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    console.log(ventasValidas);
    
    res.json({
        ventas: ventasValidas
    });
});

// Ruta para buscar venta por ID
rutas.get("/buscarPorId/:id", async (req, res) => {
    var ventaValido = await buscarPorID(req.params.id); // Cambié buscarPorIDP a buscarPorID
    if (ventaValido) {
        res.json(ventaValido);
    } else {
        res.status(404).json({ error: "Venta no encontrada" });
    }
});

// Ruta para cancelar una venta (cambiar estado)
rutas.put("/estadoVenta/:id", async (req, res) => {
    await estadoVenta(req.params.id);
    res.json({ mensaje: "Estado de la venta actualizado" });
});

// Ruta para crear una nueva venta
rutas.post("/nuevaVenta", async (req, res) => {
    var ventaValido = await nuevaVenta(req.body);
    if (ventaValido) {
        res.status(201).json({ mensaje: "Venta creada con éxito" });
    } else {
        res.status(400).json({ error: "Datos de la venta inválidos o ID de usuario/producto no válido" });
    }
});

module.exports = rutas;
