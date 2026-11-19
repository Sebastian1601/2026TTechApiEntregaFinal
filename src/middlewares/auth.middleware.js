import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization?.startsWith("Bearer")) {
        return res
            .status(401)
            .json({ message: "Token requerido." })
    };
    const token = authorization.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        return res.status(403).json({
            message: "Token inválido o vencido."
        });
    }
};