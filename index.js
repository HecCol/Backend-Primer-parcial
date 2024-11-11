const express=require("express");
const session=require("express-session");
const cors=require("cors");
const usuarioRutas=require("./rutas/rutasUsuarios");
const productoRutas=require("./rutas/rutasProductos");
const rutasVentas = require('./rutas/rutasVentas');

const app=express();
app.use(session({
    secret:"3SPR3S0",
    resave:true,
    saveUninitialized:true,
    cookie:{secret:true}
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/usuarios", usuarioRutas);
app.use("/productos", productoRutas);
app.use('/ventas', rutasVentas);


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port)
});