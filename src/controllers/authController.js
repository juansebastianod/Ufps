import { loginServices } from "../services/authService.js";

export const login = async (req, res) => {
    const { correo, password, rol_id } = req.body;
    const response = await loginServices(correo, password, rol_id);

    if (response.status === 201) {
        res.cookie('token', response.token);
    }

    res.status(response.status).json({
        message: response.message
    });
};
