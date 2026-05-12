# Guide de Configuration - Helpdesk Application

## ✅ Corrections Apportées

1. **Créé backend/package.json** - Toutes les dépendances nécessaires (express, sequelize, cors, jwt, etc.)
2. **Ajouté configuration CORS** - Le backend accepte maintenant les requêtes du frontend
3. **Configuré proxy Vite** - Les requêtes API frontend sont redirigées vers le backend
4. **Ajouté fichiers .env** - Configuration centralisée des variables d'environnement
5. **Middleware d'erreurs** - Gestion globale des erreurs côté serveur
6. **Fichiers .gitignore** - Pour ignorer les fichiers sensibles

---

## 🚀 Installation et Démarrage

### Backend Setup
```bash
cd backend
npm install
```

**Configuration du .env:**
```
DB_HOST=localhost
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=helpdesk_db
PORT=3000
JWT_SECRET=your_secret_key_change_in_production
```

**Démarrage du backend:**
```bash
npm run dev    # Mode développement avec nodemon
# ou
npm start      # Mode production
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

L'application frontend sera accessible sur `http://localhost:5173`

---

## 🔧 Configuration de la Base de Données

1. Créez une base de données MySQL:
```sql
CREATE DATABASE helpdesk_db;
```

2. Les modèles Sequelize créeront les tables automatiquement au premier démarrage.

---

## 📋 Checklist de Vérification

- [x] Backend a package.json avec les dépendances
- [x] CORS configuré pour communication frontend/backend
- [x] Vite proxy configuré pour API calls
- [x] Variables d'environnement (.env)
- [x] Middleware d'authentification JWT
- [x] Gestion d'erreurs globale
- [x] .gitignore pour frontend et backend

---

## 🛠️ Dépannage

**Erreur: "Cannot find module 'express'"**
→ Installez les dépendances: `npm install` dans le dossier backend

**Erreur: "CORS policy blocked"**
→ Le proxy Vite n'est actif qu'en développement. En production, configurez CORS correctement.

**Erreur: "JWT Token manquant"**
→ Les routes protégées nécessitent un token JWT dans le header: `Authorization: Bearer <token>`

---

## 📝 Prochaines Étapes Recommandées

1. Initialiser les tables Sequelize dans la base de données
2. Implémenter l'authentification/login (endpoint pour obtenir le JWT)
3. Tester les endpoints API avec Postman/Insomnia
4. Ajouter les validations de formulaires côté frontend
5. Implémenter la gestion des fichiers pour les attachments
