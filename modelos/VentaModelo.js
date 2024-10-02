class Venta {
    constructor(data) {
        this.id = data.id;
        this.fecha = data.fecha;
        this.hora = data.hora;
        this.cantidad = data.cantidad;
        this.idUsu = data.idUsu;
        this.idprod = data.idProd;
        this.estado = data.estado;
    }

    // Setters
    set id(id) {
        this._id = id;
    }

    set fecha(fecha) {
            this._fecha = fecha;
    }

    set hora(hora) {
        this._hora = hora;  // Aquí corregí la ortografía
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }

    set idUsu(idUsu) {
        this._idUsu = idUsu;
    }

    set idProd(idProd) {
        this._idProd = idProd;
    }

    set estado(estado) {
        this._estado = estado;
    }

    // Getters
    get id() {
        return this._id;
    }

    get fecha() {
        return this._fecha;
    }

    get hora() {
        return this._hora;
    }

    get cantidad() {
        return this._cantidad;
    }

    get idUsu() {
        return this._idUsu;
    }

    get idProd() {
        return this._idProd;
    }

    get estado() {
        return this._estado;
    }

    get getProducto() {
        const conId = {
            id: this._id,
            fecha: this._fecha,
            hora: this._hora,
            cantidad: this._cantidad,
            idUsu: this._idUsu,
            idProd: this._idProd,
            estado: this._estado
        };

        const sinId = {
            fecha: this._fecha,
            hora: this._hora,
            cantidad: this._cantidad,
            idUsu: this._idUsu,
            idProd: this._idProd,
            estado: this._estado
        };

        return this._id === undefined ? sinId : conId;
    }
}

module.exports = Venta;
