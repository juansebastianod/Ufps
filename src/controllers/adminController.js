
import { createUser,createRoom , getVigilantsService,getFilteredStudentsService} from "../services/adminService.js";
import { pool } from "../db.js";
import bcrypt from 'bcryptjs';


export const registerAdmin = async (req, res) => {
    const { name, email, password, code, id_number } = req.body;  // Uso de nombres en inglés
    const roleId = 1;  // Asignando 1 como el rol de Admin (por defecto)

    try {
        // Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Consultar la base de datos, permitiendo valores nulos en email y id_number
        const query = `
            INSERT INTO users (name, email, password, code, role_id, id_number)  -- Cambio de nombres a inglés
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, email, code, role_id, id_number
        `;
        
        // Si email o id_number no se proporcionan, se les asigna un valor null
        const values = [name, email || null, passwordHash, code, roleId, id_number || null];

        // Ejecutar la consulta
        const { rows } = await pool.query(query, values);

        // Verificar si se insertó correctamente
        if (rows.length > 0) {
            res.status(201).json(rows[0]);
        } else {
            throw new Error('Unable to register Admin user');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const registerGuardtController = async (req, res) => {
    const { name, email, password, code, id_number } = req.body;
    const vigilant = {
        name,
        email,
        password,
        code,
        id_number, // Número de cédula
        role_id: 3  // Role ID para Vigilante
    };

    const response = await createUser(vigilant);
    res.status(response.status).json({ message: response.message });
};

export const registerStudentController = async (req, res) => {
    const { name, email, password, code, id_number } = req.body;

    const student = {
        name,
        email,
        password,
        code,
        id_number, // Número de cédula
        role_id: 2  // Role ID para Estudiante
    };

    const response = await createUser(student);
    res.status(response.status).json({ message: response.message });
};



export const registerRoomController = async (req, res) => {
    const { nombre } = req.body;
  
    const room = { nombre }; // estado no se incluye, se pone en false por defecto
  
    const response = await createRoom(room);
    res.status(response.status).json({ message: response.message, data: response.data });
  };
  

  export const listVigilantsController = async (req, res) => {
    try {
        const vigilants = await getVigilantsService();
        return res.status(200).json(vigilants);
    } catch (error) {
        console.error('Error en el controlador:', error.message);
        return res.status(500).json({ message: 'Error al obtener vigilantes' });
    }
};

export const getFilteredStudentsController = async (req, res) => {
    const { name, email } = req.body; // Esperamos que estos parámetros vengan en el body de la solicitud
    
    try {
        // Si no hay parámetros de filtro, mostramos todos los estudiantes
        const students = await getFilteredStudentsService(name, email);
        
        // Retornamos los estudiantes
        return res.status(200).json(students);
    } catch (error) {
        console.error('Error en el controlador:', error.message);
        return res.status(500).json({ message: 'Error al obtener estudiantes filtrados' });
    }
};

