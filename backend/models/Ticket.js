import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ticket = sequelize.define("Ticket", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "Ouvert" },
  priority: { type: DataTypes.STRING, defaultValue: "Moyenne" },
  category: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING, defaultValue: "Incident" },
  attachment: { type: DataTypes.STRING },
  agent_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER }
});

export default Ticket;
