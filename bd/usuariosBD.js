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

async function login(usuario,password){
    console.log(usuario);
    const usuarioCorrecto = await usuariosBD.where("usuario","==",usuario).get();
    console.log(usuarioCorrecto.data);
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

async function editarUsuario(id, nuevosDatos) {
    // Validar si existe el usuario
    const usuarioExistente = await buscarPorID(id);
    if (!usuarioExistente) {
        console.log(`Usuario con ID ${id} no encontrado.`);
        return false;
    }

    // Validar datos antes de realizar la actualización
    if (nuevosDatos.password) {
        const { salt, hash } = encriptarPassword(nuevosDatos.password);
        nuevosDatos.password = hash;
        nuevosDatos.salt = salt;
    }

    // Crear una instancia de Usuario con los nuevos datos
    const usuarioActualizado = new Usuario({ id, ...usuarioExistente, ...nuevosDatos });
    if (validarDatos(usuarioActualizado.getUsuario)) {
        await usuariosBD.doc(id).update(usuarioActualizado.getUsuario);
        console.log(`Usuario con ID ${id} actualizado correctamente.`);
        return true;
    }

    console.log("Datos no válidos para actualización.");
    return false;
}


module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorID,
    editarUsuario,
    login
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