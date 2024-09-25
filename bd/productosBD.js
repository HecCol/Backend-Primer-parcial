const productosBD = require("./conexion").productos;
const Producto = require("../modelos/ProductoModelo");

function validarProducto(producto) {
    var valido = false;
    if (producto.nombre != undefined && producto.descripcion != undefined && producto.precio != undefined && producto.stock != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarProducto(producto1.getProducto)) {  // Cambié validarDatos a validarProducto
            productosValidos.push(producto1.getProducto);
        }
    });
    console.log(productosValidos);
    return productosValidos;
}

async function buscarPorIDP(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    var productoValido;
    if (validarProducto(producto1.getProducto)) {  // Cambié validarDatos a validarProducto
        productoValido = producto1.getProducto;
    }
    console.log(productoValido);
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    console.log(producto1.getProducto);  // Cambié usuario1 a producto1
    var productoValido = false;
    if (validarProducto(producto1.getProducto)) {  // Cambié validarDatos a validarProducto
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id) {
    var productoValido = await buscarPorIDP(id);  // Cambié buscarPorID a buscarPorIDP
    var productoBorrado = false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorIDP
};