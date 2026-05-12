import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ticket from './Ticket.js';

const Attachment = sequelize.define('Attachment', {
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'attachments',
  timestamps: true
});

Ticket.hasMany(Attachment, { foreignKey: 'ticket_id' });
Attachment.belongsTo(Ticket, { foreignKey: 'ticket_id' });

export default Attachment;
