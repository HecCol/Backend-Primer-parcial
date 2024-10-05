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
    if (validarVenta(venta1)) {  // Usa 'venta1' si 'getVenta' no es un método
        ventasValidas = venta1;   // O almacena el objeto completo si es necesario
    }
    console.log(ventasValidas);
    return ventasValidas;
}

async function nuevaVenta(data) {
    const venta1 = new Venta(data);
    console.log(venta1.getVenta);
    var ventasValidas = false;
    if (validarVenta(venta1.getVenta)) {
        await ventasBD.add(venta1.getVenta);
        ventasValidas = true;
    }
    return ventasValidas;
}

async function cambiarEstatus(id) {
    var ventasValidas = await buscarPorID(id);  // Asegúrate de que buscarPorID devuelva el objeto completo
    var estatusCambiado = false;
    if (ventasValidas) {
        try {
            await ventasBD.doc(id).update({ estatus: "cancelado" });
            estatusCambiado = true;
        } catch (error) {
            console.error("Error al actualizar el estatus:", error);  // Agrega manejo de errores
        }
    }
    return estatusCambiado;
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    cambiarEstatus,
    buscarPorID
};