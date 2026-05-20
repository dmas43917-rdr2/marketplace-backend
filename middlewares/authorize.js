/*module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Akses ditolak' });
        }

        next()
    };
};*/

module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: 'Forbidden: akses ditolak',
            });
        }

        next();
    };
};