import { registerUser } from "../repositories/usuarioRepository.js";
import { registerRoom } from "../repositories/salaRepository.js";
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHash = {
      ...userData,
      password: hashedPassword
    };

    const result = await registerUser(userWithHash);

    // Determine role name based on role_id
    const roleName = userData.role_id === 3 ? 'Vigilante' :
                     userData.role_id === 2 ? 'Student' :
                     'User';

    return {
      status: 201,
      message: `${roleName} registered successfully.`,
      data: result
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      status: 500,
      message: "Error registering user."
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
