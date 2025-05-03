import { verificaUser,loginRepository,verificaPassword } from "../repositories/usuarioRepository.js";

export const loginServices = async (correo, password) => {

    const user= await verificaUser(correo);
    if(user.verdad){
        return new Respuesta(400, "Usuario no existente",null )
    }
    const comparePassword = await verificaPassword(password,correo);
    if(!comparePassword){
        return new Respuesta(400, "Contraseña incorrecta",null )
    }
    const response= await loginRepository(correo,password)

    return response
    
  };
