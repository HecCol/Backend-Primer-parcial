class Venta {
    constructor(data) {
        this.id = data.id;
        this.fecha = data.fecha;
        this.hora = data.hora; // Aquí el setter ya estará funcionando.
        this.idUsu = data.idUsu;
        this.idProd = data.idProd;
        this.estatus = data.estatus;
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

    set idUsu(idUsu) {
        this._idUsu = idUsu;
    }

    set idProd(idProd) {
        this._idProd = idProd;
    }

    set estatus(estatus) {
        this._idProd = idProd;
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

    get idUsu() {
        return this._idUsu;
    }

    get idProd() {
        return this._idProd;
    }

    get estatus() {
        return this._estatus;
    }

    get getVenta() {
        const conId = {
            id: this._id,
            fecha: this._fecha,
            hora: this._hora,
            idUsu: this._idUsu,
            idProd: this._idProd,
            estatus: this._estatus
        };

        const sinId = {
            fecha: this._fecha,
            hora: this._hora,
            idUsu: this._idUsu,
            idProd: this._idProd,
            estatus: this._estatus
        };

        return this._id === undefined ? sinId : conId;
    }
}

module.exports = Venta;
