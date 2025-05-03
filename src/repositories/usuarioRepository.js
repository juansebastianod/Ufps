import { pool } from "../db.js";

export const registerUser = async (userEntity) => {
    const query = `
    INSERT INTO usuarios (nombre, correo, password, codigo, rol_id)
    VALUES ($1, LOWER(TRIM($2)), $3, TRIM($4), $5)
    RETURNING id, nombre, correo, codigo, rol_id
`;
    const values = [
        userEntity.nombre,
        userEntity.correo,
        userEntity.password,
        userEntity.codigo,
        userEntity.rol_id
    ];

    const { rows } = await pool.query(query, values);
    return rows.length > 0 ? rows[0] : null;
};
