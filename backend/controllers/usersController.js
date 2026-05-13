import User from '../models/User.js';

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Impossible de récupérer les utilisateurs.' });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // ✅ Sequelize utilise findByPk
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Utilisateur introuvable.' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Impossible de supprimer l’utilisateur.' });
  }
};
