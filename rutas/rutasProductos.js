var rutas = require("express").Router();
var {mostrarProductos, nuevoProducto, borrarProducto, buscarPorID} = require("../bd/productosBD");

rutas.get("/mostrarProductos", async (req, res) => {
    var productosValidos = await mostrarProductos();
    console.log(productosValidos);
    
    res.json({
        productos: productosValidos
    });
});

// Ruta de productos 
rutas.get("/buscarPorIdP/:id", async (req, res) => {
    var productoValido = await buscarPorID(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado); // Aquí estaba mal escrito también, corregí de usuarioBorrado a productoBorrado
});

rutas.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

module.exports = rutas;