import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notification = sequelize.define('Notification', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('lu', 'non_lu'),
    defaultValue: 'non_lu'
  }
}, {
  tableName: 'notifications',
  timestamps: true
});

export default Notification;
