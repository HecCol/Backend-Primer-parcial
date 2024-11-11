const ventasBD = require("./conexion").ventas;
const Venta = require("../modelos/VentaModelo");
const { id } = require("../bd/usuariosBD");

function validarVenta(venta) {
    let valido = false;
    if (venta.fecha !== undefined && venta.hora !== undefined && venta.idUsu !== undefined && venta.idProd !== undefined && venta.estatus !== undefined) {
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

// Función para buscar una venta por ID
async function buscarPorID(id) {
    const venta = await ventasBD.doc(id).get();
    console.log(venta.id);
    if (!venta.exists) {
        console.log(`Venta con ID ${id} no encontrada.`);
        return null;
    }
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    return validarVenta(venta1.getVenta) ? venta1.getVenta : null;
}

async function nuevaVenta(data) {
    // Asigna automáticamente el valor "venido" si no se especifica
    data.estatus = data.estatus || "Venido";

    const venta1 = new Venta(data);
    console.log(venta1.getVenta);

    let ventasValidas = false;
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
            await ventasBD.doc(id).update({ estatus: "Cancelado" });
            estatusCambiado = true;
        } catch (error) {
            console.error("Error al actualizar el estatus:", error);  // Agrega manejo de errores
        }
    }
    return estatusCambiado;
}

// Función para borrar una venta por ID
async function borrarVenta(id) {
    const ventaValida = await buscarPorID(id);
    if (!ventaValida) {
        console.log(`No se puede borrar. Venta con ID ${id} no encontrada.`);
        return false;
    }
    try {
        await ventasBD.doc(id).delete();
        return true;
    } catch (error) {
        console.error("Error al borrar la venta:", error);
        return false;
    }
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    cambiarEstatus,
    buscarPorID,
    borrarVenta
};