import jwt from 'jsonwebtoken';


export const login = (req, res) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
        return res.status(422).json({ error: "Email y password son necesarios" });
    };

    if (
        email !== process.env.DEMO_EMAIL ||
        password !== process.env.DEMO_PASSWORD
    ) {
        return res.status(401).json({
            error: "Credenciales incorrectas",
        });
    }
    const user = { email: email };
    const expiration = { expiresIn: '15m' };
    const token = jwt.sign(user, process.env.JWT_SECRET, expiration);

    return res.status(200).json({
        token: token
    });
};