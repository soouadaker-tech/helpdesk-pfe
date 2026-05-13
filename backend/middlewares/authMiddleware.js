import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  const secret = process.env.JWT_SECRET || "secretKey";

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Utilisateur introuvable" });
    }
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(403).json({ error: "Token invalide: " + err.message });
  }
};
