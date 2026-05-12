import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ticket = sequelize.define("Ticket", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM("Ouvert", "En cours", "Fermé"), defaultValue: "Ouvert" },
  agent_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: "tickets",
  timestamps: true
});

export default Ticket;
