import { registerUser } from "../repositories/usuarioRepository.js";
import { registerRoom } from "../repositories/salaRepository.js";
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
  try {
    // Hashear contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHash = {
      ...userData,
      password: hashedPassword
    };

    const result = await registerUser(userWithHash);

    const roleName = userData.rol_id === 6 ? 'Vigilante' :
                     userData.rol_id === 5 ? 'Estudiante' :
                     'Usuario';

    return {
      status: 201,
      message: `${roleName} registrado exitosamente.`,
      data: result
    };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return {
      status: 500,
      message: "Error al registrar usuario."
    };
  }
};


export const createRoom = async (roomData) => {
  try {
    const result = await registerRoom(roomData);
    return {
      status: 201,
      message: "Sala registrada exitosamente.",
      data: result
    };
  } catch (error) {
    console.error("Error al registrar sala:", error);
    return {
      status: 500,
      message: "Error al registrar sala."
    };
  }
};
