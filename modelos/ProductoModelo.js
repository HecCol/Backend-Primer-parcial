class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion; // Aquí el setter ya estará funcionando.
        this.precio = data.precio;
        this.stock = data.stock;
    }

    // Setters
    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre;
        }
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion;  // Aquí corregí la ortografía
    }

    set precio(precio) {
        this._precio = precio;
    }

    set stock(stock) {
        this._stock = stock;
    }

    // Getters
    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get precio() {
        return this._precio;
    }

    get stock() {
        return this._stock;
    }

    get getProducto() {
        const conId = {
            id: this._id,
            nombre: this._nombre,
            descripcion: this._descripcion,
            precio: this._precio,
            stock: this._stock
        };

        const sinId = {
            nombre: this._nombre,
            descripcion: this._descripcion,
            precio: this._precio,
            stock: this._stock
        };

        return this._id === undefined ? sinId : conId;
    }
}

module.exports = Producto;
