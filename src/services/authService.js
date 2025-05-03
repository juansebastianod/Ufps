import { findUserByEmail, verifyPassword , loginRepository } from "../repositories/usuarioRepository.js";
import { tokenAcceso } from "../lib/jwt.js";
import bcrypt from 'bcryptjs';

export const loginService = async (email, password, role_id) => {
    const user = await findUserByEmail(email);

    if (user.notFound) {
        return {
            status: 400,
            message: "User does not exist",
            data: null
        };
    }

    if (user.data.role_id !== role_id) {
        return {
            status: 403,
            message: "Incorrect role for this user",
            data: null
        };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.data.password);

    if (!isPasswordMatch) {
        return {
            status: 400,
            message: "Incorrect password",
            data: null
        };
    }

    const token = await tokenAcceso({
        id: user.data.id,
        role: user.data.role_id
    });

    let roleMessage = "Login successful";

    switch (role_id) {
        case 1:
            roleMessage = "Admin login successful";
            break;
        case 2:
            roleMessage = "Student login successful";
            break;
        case 3:
            roleMessage = "Vigilant login successful";
            break;
    }

    return {
        status: 201,
        message: roleMessage,
        token
    };
};
