import { verificaUser,loginRepository,verificaPassword } from "../repositories/usuarioRepository.js";
import { tokenAcceso } from "../lib/jwt.js";
import bcrypt from 'bcryptjs';

export const loginServices = async (correo, password, rol_id) => {
    const user = await verificaUser(correo);

    if (user.verdad) {
        return {
            status: 400,
            message: "Usuario no existente",
            data: null
        };
    }

    if (user.found.rol_id !== rol_id) {
        return {
            status: 403,
            message: "Rol incorrecto para este usuario",
            data: null
        };
    }

    const comparePassword = await bcrypt.compare(password, user.found.password);

    if (!comparePassword) {
        return {
            status: 400,
            message: "Contraseña incorrecta",
            data: null
        };
    }

    const token = await tokenAcceso({
        id: user.found.id,
        role: user.found.rol_id
    });

    let rolMessage = "Inicio de sesión";

    switch (rol_id) {
        case 4:
            rolMessage = "Inicio de sesión del Administrador";
            break;
        case 5:
            rolMessage = "Inicio de sesión del Estudiante";
            break;
        case 6:
            rolMessage = "Inicio de sesión del Vigilante";
            break;
    }

    return {
        status: 201,
        message: rolMessage,
        token
    };
};

