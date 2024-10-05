var rutas = require("express").Router();
var {mostrarVentas, nuevaVenta, cambiarEstatus, buscarPorID} = require("../bd/ventasBD");

rutas.get("/mostrarVentas", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    console.log(ventasValidas);
    
    res.json({
        ventas: ventasValidas
    });
});

// Ruta de productos 
rutas.get("/buscarPorIdP/:id", async (req, res) => {
    var productoValido = await buscarPorID(req.params.id);
    res.json(productoValido);
});

rutas.post("/cambiarEstatus/:id", async (req, res) => {
    var estatusCambiado = await cambiarEstatus(req.params.id);
    res.json(estatusCambiado); // Aquí estaba mal escrito también, corregí de usuarioBorrado a productoBorrado
});

rutas.post("/nuevaVenta", async (req, res) => {
    var ventasValidas = await nuevaVenta(req.body);
    res.json(ventasValidas);
});

module.exports = rutas;