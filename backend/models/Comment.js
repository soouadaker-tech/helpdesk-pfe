import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ticket from './Ticket.js';
import User from './User.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comments',
  timestamps: true
});

Ticket.hasMany(Comment, { foreignKey: 'ticket_id' });
Comment.belongsTo(Ticket, { foreignKey: 'ticket_id' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'author' });
User.hasMany(Comment, { foreignKey: 'user_id' });

export default Comment;
