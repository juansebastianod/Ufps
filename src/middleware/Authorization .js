export const authorizeAdmin = (req, res, next) => {
    if (req.user.rol_id !== 4) { 
        return res.status(403).json({ message: 'Acceso denegado, solo administradores' });
    }
    next();
};
