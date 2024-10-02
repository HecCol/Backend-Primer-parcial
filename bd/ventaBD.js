const ventasBD = require("./conexion").ventas;
const Venta = require("../modelos/VentaModelo");
const usuarioBD = require("./conexion").usuarios;
const productoBD = require("./conexion").productos;

function validarVenta(venta) {
    var valido = true;
    if (!venta.fecha || !venta.hora || !venta.cantidad || !venta.idUsu || !venta.idProd || !venta.estado) {
        valido = false;
    }
    return valido;
}

async function validarIdUsu(idUsu) {
    const usuario = await usuarioBD.doc(idUsu).get();
    return usuario.exists; // Verifica si el usuario existe
}

async function validarIdProd(idProd) {
    const producto = await productoBD.doc(idProd).get();
    return producto.exists; // Verifica si el producto existe
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    const ventasValidas = [];
    ventas.forEach((venta) => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        if (validarVenta(venta1)) {
            ventasValidas.push(venta1.getVenta); // Cambié de getProducto a getVenta
        }
    });
    console.log(ventasValidas);
    return ventasValidas;
}

async function buscarPorID(id) {
    const venta = await ventasBD.doc(id).get();
    if (!venta.exists) return null;
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    var ventaValida = null;
    if (validarVenta(venta1)) {
        ventaValida = venta1.getVenta; // Cambié de getProducto a getVenta
    }
    console.log(ventaValida);
    return ventaValida;
}

async function nuevaVenta(data) {
    const venta1 = new Venta(data);
    var ventaValida = false;
    if (validarVenta(venta1)) {
        const idUsuValido = await validarIdUsu(data.idUsu); // Corregí la referencia de usuario
        const idProdValido = await validarIdProd(data.idProd); // Corregí la referencia de producto
        if (idUsuValido && idProdValido) {
            await ventasBD.doc().set(venta1.getVenta); // Cambié de getProducto a getVenta
            ventaValida = true;
        } else {
            console.log(idUsuValido ? "ID de producto no encontrado" : "ID de usuario no encontrado");
        }
    }
    return ventaValida;
}

async function estadoVenta(id) {
    const venta = await buscarPorID(id);
    if (!venta) return;
    await ventasBD.doc(id).update({ estado: "Cancelada" });
    console.log("Venta cancelada.");
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    estadoVenta,
    buscarPorID
};
