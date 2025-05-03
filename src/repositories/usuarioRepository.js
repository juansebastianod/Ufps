import { pool } from "../db.js";
import { tokenAcceso } from '../lib/jwt.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (user) => {
  const query = `
    INSERT INTO users (name, email, password, code, role_id, id_number)  -- Todos los campos en inglés
    VALUES ($1, LOWER(TRIM($2)), $3, TRIM($4), $5, $6)
    RETURNING id, name, email, code, role_id, id_number  -- Campos de retorno
  `;
  const values = [
    user.name,    
    user.email,  
    user.password, 
    user.code,    
    user.role_id, 
    user.id_number 
  ];

  const { rows } = await pool.query(query, values);
  return rows.length > 0 ? rows[0] : null;
};



export const loginRepository = async (email) => {
  try {
      const user = await findUserByEmail(email);
      if (user.notFound) {
          return {
              status: 404,
              message: "User not found"
          };
      }

      const payload = {
          id: user.data.id,
          role: user.data.role_id
      };

      const token = await generateAccessToken(payload);

      return {
          token,
          message: "Login successful",
          status: 201
      };
  } catch (error) {
      console.error('Login error:', error.message);
      return {
          status: 500,
          message: "Server error during login"
      };
  }
};

export const findUserByEmail = async (email) => {
  const query = `
      SELECT id, email, password, role_id
      FROM users
      WHERE email = $1
  `;
  const { rows } = await pool.query(query, [email]);

  if (rows.length === 0) {
      return {
          notFound: true,
          data: null
      };
  }

  return {
      notFound: false,
      data: rows[0]
  };
};


export const verifyPassword = async (password, email) => {
  const user = await findUserByEmail(email);

  if (user.notFound) return false;

  return await bcrypt.compare(password, user.data.password);
};
