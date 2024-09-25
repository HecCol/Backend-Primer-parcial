const usuariosBD = require("./conexion").usuarios;
const Usuario=require("../modelos/UsuarioModelo");
const {encriptarPassword,validarPassword,usuarioAutorizado,adminAutorizado}=require("../middlewares/funcionesPassword");

function validarDatos(usuario){
    var valido=false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1=new Usuario({id:usuario.id,...usuario.data()});
        if(validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    console.log(usuariosValidos);
    return usuariosValidos;
}

async function buscarPorID(id) {
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido;
    if(validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario;
    }
    console.log(usuarioValido);
    return usuarioValido;
}

async function nuevoUsuario(data) {
    const {salt,hash} = encriptarPassword(data.password); 
    data.password=hash;
    data.salt = salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    console.log(usuario1.getUsuario);
    var usuarioValido=false;
    if(validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
    return usuarioValido;
}

async function borrarUsuario(id){
    var usuarioValido = await buscarPorID(id);
    var usuarioBorrado = false;
    if(usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorID
};

//borrarUsuario("44A6rb4cnVr2jr4SwHCA");

//Revisar cuando si existe el usuario, pero el usuario es incorrecto
//borrarUsuario("xfCJ4arzH6Bhx6EAuu3t");

/*data={
}
async function prueba(){
    console.log(await nuevoUsuario(data));
}

prueba();*/


//buscarPorID("200");
//buscarPorID("xfCJ4arzH6Bhx6EAuu3t");

//mostrarUsuarios();