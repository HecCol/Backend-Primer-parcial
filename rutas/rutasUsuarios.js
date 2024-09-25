var rutas = require("express").Router();
//var {Router} = require("express"); - alternativa
var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorID} = require("../bd/usuariosBD");
var {mostrarProductos, nuevoProducto, borrarProducto, buscarPorIDP} = require("../bd/productosBD");

rutas.get("/", async (req, res) => {
    //res.send("hola estas en raiz");
    var usuariosValidos = await mostrarUsuarios();
    var productosValidos = await mostrarProductos();
    console.log(productosValidos);
    console.log(usuariosValidos);
    
    // Corregido: envía ambos resultados en un solo objeto JSON
    res.json({
        usuarios: usuariosValidos,
        productos: productosValidos
    });
});

rutas.get("/buscarPorId/:id", async (req, res) => {
    var usuarioValido = await buscarPorID(req.params.id);
    res.json(usuarioValido);
});

rutas.delete("/borrarUsuario/:id", async (req, res) => {
    var usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario", async (req, res) => {
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

// Ruta de productos 
rutas.get("/buscarPorIdP/:id", async (req, res) => {
    var productoValido = await buscarPorIDP(req.params.id);
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
