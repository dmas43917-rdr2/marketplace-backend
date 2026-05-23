module.exports = (shcema) => {
    return (req, res, next) => {
        const { error } = shcema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details.map(e => e.message) });
        }

        next();
    };
};