export const authorizeAdmin = (req, res, next) => {
    if (req.user.rol_id !== 4) { 
        return res.status(403).json({ message: 'Acceso denegado, solo administradores' });
    }
    next();
};


export const authorizeStudent = (req, res, next) => {
    if (req.user.rol_id !== 5) { 
        return res.status(403).json({ message: 'Acceso denegado, solo estudiantes' });
    }
    next();
};


export const authorizeVigilant = (req, res, next) => {
    if (req.user.rol_id !== 6) { 
        return res.status(403).json({ message: 'Acceso denegado, solo vigilantes' });
    }
    next();
};