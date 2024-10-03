const ventasBD = require("./conexion").ventas;
const Venta = require("../modelos/VentaModelo");
const {id} = require("../bd/usuariosBD");

function validarVenta(venta) {
    var valido = false;
    if (venta.fecha != undefined && venta.hora != undefined && venta.idUsu != undefined && venta.idProd != undefined && venta.estatus != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    const ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        if (validarVenta(venta1.getVenta)) {  // Cambié validarDatos a validarProducto
            ventasValidas.push(venta1.getVenta);
        }
    });
    console.log(ventasValidas);
    return ventasValidas;
}

async function buscarPorID(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    var ventasValidas;
    if (validarVenta(venta1.getVenta)) {  // Cambié validarDatos a validarProducto
        ventasValidas = venta.getVenta;
    }
    console.log(ventasValidas);
    return ventasValidas;
}

async function nuevaVenta(data) {
    const venta1 = new Venta(data);
    console.log(producto1.getProducto);  // Cambié usuario1 a producto1
    var ventasValidas = false;
    if (validarVenta(venta1.getVenta)) {  // Cambié validarDatos a validarProducto
        await VentasBD.doc().set(venta1.getVenta);
        ventasValidas = true;
    }
    return ventasValidas;
}

async function cambiarEstatus(id) {
    var ventasValidas = await buscarPorID(id);  // Cambié buscarPorID a buscarPorIDP
    var estatusCambiado = false;
    if (ventasValidas) {
        await ventasBD.doc(id).update({ estatus: "cancelado" });
        estatusCambiado = true;
    }
    return estatusCambiado;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorID
};