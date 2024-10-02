const admin = require("firebase-admin");
const keys = require("../keys.json");
admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const proyecto = admin.firestore();
const usuarios = proyecto.collection("Usuarios");
const productos = proyecto.collection("Productos");
const ventas = proyecto.collection("Ventas");

module.exports={
    usuarios,
    productos,
    ventas
}