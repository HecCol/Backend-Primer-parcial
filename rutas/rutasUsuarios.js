var rutas = require("express").Router();
//var {Router} = require("express"); - alternativa
var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorID, editarUsuario, login} = require("../bd/usuariosBD");

rutas.post("/login",async(req,res)=>{
    const sesionValida = await login(req.body.usuario,req.body.password);
    res.json(req.body);
})

rutas.get("/mostrar",async(req,res) => {
    //res.send("hola estas en raiz");
    var usuariosValidos = await mostrarUsuarios();
    console.log(usuariosValidos);
    
    // Corregido: envía ambos resultados en un solo objeto JSON
    res.json(usuariosValidos);
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

// Nueva ruta para editar un usuario
rutas.put("/editarUsuario/:id", async (req, res) => {
    var usuarioEditado = await editarUsuario(req.params.id, req.body);
    res.json(usuarioEditado);
});

module.exports = rutas;
