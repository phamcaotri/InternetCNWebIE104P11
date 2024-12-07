import bcrypt from 'bcryptjs/dist/bcrypt.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import sanitizeHtml from 'sanitize-html';

const auth = { };

auth.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const cleanName = sanitizeHtml(name);
    const cleanEmail = sanitizeHtml(email);

    console.log("Cleaned name: ", cleanName);
    console.log("Cleaned email: ", cleanEmail);

    try {
        //if user exists
        const existingUser = await User.findByEmail({ email: cleanEmail });
        if (existingUser) {
            return res.status(409).json({message: 'Người dùng đã tồn tại!'});
        }

        const encryptedPass = await bcrypt.hash(password, 10);

        await User.addUser({name: cleanName, email: cleanEmail, password: encryptedPass});

        res.status(201).json({message: 'Bạn đã đăng kí thành công. Vui lòng quay về trang đăng nhập để tếp tục sử dụng dịch vụ!'})
    } catch (err) {
        res.status(500).json({message: 'Server hiện tại đang bận, xin vui lòng thử lại sau.', error: err.message});
    }
};

auth.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const cleanEmail = sanitizeHtml(email);

    try {
        const user = await User.findByEmail({ email: cleanEmail });
        //if user doesnt exist
        if (!user) {
            return res.status(400).json({message: 'Tên người dùng không tồn tại. Xin hãy thử lại'});
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        //if password invalid
        if(!checkPassword) {
            return res.status(400).json({message: 'Mật khẩu bạn nhập không đúng. Xin hãy thử lại.'});
        }

        const token = jwt.sign({ id: user.id_user, cleanEmail: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token, message: "Chào mừng bạn đến với Reelphim!"})
    } catch (err) {
        res.status(500).json({message: 'Server hiện tại đang bận, xin vui lòng thử lại sau.', error: err.message});
    }
};

auth.logout = (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({ message: 'Đăng xuất thành công' });
}

export default auth;