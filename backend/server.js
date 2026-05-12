import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';

import ticketsRoutes from './routes/ticketsRoutes.js';
import attachmentsRoutes from './routes/attachmentsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/attachments", attachmentsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", usersRoutes);


sequelize
  .sync({ alter: true })
  .then(() => {
    const port = process.env.PORT || 5000;
    console.log("✅ Base de données synchronisée avec Sequelize");
    app.listen(port, () =>
      console.log(`🚀 Backend running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("Erreur de synchronisation:", err));
