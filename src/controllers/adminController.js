
import { createUser,createRoom } from "../services/adminService.js";
import { loginServices } from "../services/sesion.js";
import { pool } from "../db.js";
import bcrypt from 'bcryptjs';


export const registerAdmin = async (req, res) => {
    const { nombre, correo, password, codigo } = req.body;
    const roleId = 4;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO usuarios (nombre, correo, password, codigo, rol_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nombre, correo, codigo, rol_id
        `;
        const values = [nombre, correo, passwordHash, codigo, roleId];
        const { rows } = await pool.query(query, values);

        if (rows.length > 0) {
            res.status(201).json(rows[0]);
        } else {
            throw new Error('No se pudo registrar el usuario ADMIN');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



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
  

  export const login = async (req, res) => {
    const { correo, password } = req.body;
    const response=await loginServices(correo,password);
    res.cookie('token', response.token);
    res.status(response.status).json({
        message:response.message,
    });
    
};