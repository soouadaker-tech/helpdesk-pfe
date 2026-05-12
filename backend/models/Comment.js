import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ticket from './Ticket.js';

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
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

export default Comment;
