import jwt from 'jsonwebtoken';
const { nextTick } = require('process');

const authenticate = (req, res, next) => {
try {
    const token = req.header('Authorization')?.split(' ')[1]; // Tách "Bearer <token>"
    //if no token
    if (!token) {
        res.user = null;
        return res.status(401).json({ message: 'Truy cập không hợp lệ!' });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
    } catch (err) {
        res.user = null;
        return res.status(400).json({ message: 'Truy cập không hợp lệ!', error:err.message });
    }
};

module.exports = authMiddleware;