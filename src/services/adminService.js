import { registerUser } from "../repositories/usuarioRepository.js";
import { registerRoom } from "../repositories/salaRepository.js";

export const createUser= async (vigilantData) => {
  try {
    const result = await registerUser(vigilantData);
    return {
      status: 201,
      message: "Vigilante registrado exitosamente.",
      data: result
    };
  } catch (error) {
    console.error("Error al registrar vigilante:", error);
    return {
      status: 500,
      message: "Error al registrar vigilante."
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
