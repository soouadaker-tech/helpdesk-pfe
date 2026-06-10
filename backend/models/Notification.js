import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, 
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "non_lu" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "notifications", timestamps: false });


export default Notification;
