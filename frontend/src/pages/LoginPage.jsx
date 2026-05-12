import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("❌ Veuillez remplir tous les champs.");
      return;
    }

    const result = await loginUser({ email, password });

    if (result.success && result.token) {
      // ✅ Sauvegarde du token
      localStorage.setItem("token", result.token);

      alert("✅ Connexion réussie !");
      navigate("/dashboard");
    } else {
      alert("❌ Identifiants incorrects.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Entrez votre email..."
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe..."
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Bouton Connexion */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>

        {/* Lien vers Register */}
        <p className="text-center text-gray-600 mt-4">
          Pas de compte ?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Créez-en un
          </span>
        </p>
      </div>
    </div>
  );
}
