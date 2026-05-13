import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedRole = role && role.toLowerCase() === 'admin' ? 'admin' : 'user';

    const user = await User.create({
      username: name || email,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    const secret = process.env.JWT_SECRET || "secretKey";
    const token = jwt.sign({ id: user.id, role: user.role }, secret);

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects" });
    }
    const secret = process.env.JWT_SECRET || "secretKey";
    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret
    );
    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

