
import { createUser,createRoom } from "../services/adminService.js";

export const registerVigilantController = async (req, res) => {
    const { nombre, correo, password, codigo } = req.body;

    const vigilant = {
        nombre,
        correo,
        password,
        codigo,
        rol_id: 6 
    };

    const response = await createUser(vigilant);
    res.status(response.status).json({ message: response.message });
};

export const registerStudentController = async (req, res) => {
    const { nombre, correo, password, codigo } = req.body;

    const vigilant = {
        nombre,
        correo,
        password,
        codigo,
        rol_id: 5
    };

    const response = await createUser(vigilant);
    res.status(response.status).json({ message: response.message });
};


export const registerRoomController = async (req, res) => {
    const { nombre } = req.body;
  
    const room = { nombre }; // estado no se incluye, se pone en false por defecto
  
    const response = await createRoom(room);
    res.status(response.status).json({ message: response.message, data: response.data });
  };
  