import { pool } from "../db.js";
import { tokenAcceso } from '../lib/jwt.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (user) => {
    const query = `
      INSERT INTO usuarios (nombre, correo, password, codigo, rol_id)
      VALUES ($1, LOWER(TRIM($2)), $3, TRIM($4), $5)
      RETURNING id, nombre, correo, codigo, rol_id
    `;
    const values = [
      user.nombre,
      user.correo,
      user.password,
      user.codigo,
      user.rol_id
    ];
  
    const { rows } = await pool.query(query, values);
    return rows.length > 0 ? rows[0] : null;
  };
  


export const loginRepository = async (correo) => {
    try {
        const userFound = await verificaUser(correo)
        const payload = {
            id: userFound.found.id,
            role: userFound.found.role_id 
        };
        const token = await tokenAcceso(payload);
        const objeto ={
          token:token,
          message: "Inicio de sesion",
          status:201,
        }
        return objeto
    } catch (error) {
        console.error('Error en login:', error.message);
    }
  };
  
  export const verificaUser=async (correo) => {
      const query = `
      SELECT id, correo, password, rol_id
      FROM usuarios
      WHERE correo = $1
      `;
      const { rows } = await pool.query(query, [correo]);
      if (rows.length === 0) {
          const objeto ={
              verdad:true,
              found:[]
          }
          return objeto;
      }else{
  
          const objeto={
              verdad:false,
              found:rows[0]
          }
          return objeto;
      }
  
  }


  export const verificaPassword=async (password,correo) => {
   
    const userFound = await verificaUser(correo);
    const isMatch = await bcrypt.compare(password, userFound.found.password);
    if (!isMatch) {
       return false
    }else{
        return true
    }
  }