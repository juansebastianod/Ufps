export const authorizeAdmin = (req, res, next) => {
    try {
        // Asegúrate de que req.user y req.user.role están definidos
        if (!req.user || req.user.role !== 1) {
            return res.status(403).json({ message: 'Acceso denegado, solo administradores' });
        }
        
        next(); // Continúa al siguiente middleware o ruta si es admin
    } catch (error) {
        console.error('Error en authorizeAdmin:', error.message);
        return res.status(500).json({ message: 'Error interno en autorización' });
    }
};



export const authorizeStudent = (req, res, next) => {
    try {
        if (!req.user || req.user.rol_id !== 2) {
            return res.status(403).json({ message: 'Acceso denegado, solo estudiantes' });
        }

        next(); // Usuario autorizado como estudiante
    } catch (error) {
        console.error('Error en authorizeStudent:', error.message);
        return res.status(500).json({ message: 'Error interno en autorización' });
    }
};



export const authorizeVigilant = (req, res, next) => {
    if (req.user.rol_id !== 3) { 
        return res.status(403).json({ message: 'Acceso denegado, solo vigilantes' });
    }
    next();
};