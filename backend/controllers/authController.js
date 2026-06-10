import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ success: false, error: "JWT_SECRET non configuré" });
    }

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: "Tous les champs obligatoires doivent être remplis" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Un utilisateur avec cet email existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const normalizedRole = role && role.toLowerCase() === 'admin' ? 'admin' : 'user';

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '1h' }
    );

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json({ success: true, token, user: userData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ success: false, error: "JWT_SECRET non configuré" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects" });
    }

    let valid = false;

    // إذا كلمة السر في DB مشفرة (hash يبدأ بـ $2a أو $2b)
    if (user.password.startsWith("$2a") || user.password.startsWith("$2b")) {
      valid = await bcrypt.compare(password, user.password);
    } else {
      // إذا كلمة السر مخزنة كنص عادي
      valid = (password === user.password);
    }

    if (!valid) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '1h' }
    );

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json({ success: true, token, user: userData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


