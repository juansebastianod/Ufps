import { pool } from "../db.js";

export const registerRoom = async (roomEntity) => {
    const query = `
      INSERT INTO salas (nombre)
      VALUES ($1)
      RETURNING id, nombre, estado;
    `;
    const values = [roomEntity.nombre];
  
    const { rows } = await pool.query(query, values);
    return rows.length > 0 ? rows[0] : null;
  };