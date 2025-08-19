import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({
    matricule: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // setLoading(true);
    // setError(null);

    // console.log(form.matricule)
    // console.log(form.password)
    // // Exemple de vérification simplifiée
    // if (form.username == 'admin' && form.password == 'oncf123') {
    //   // setTimeout(() => {
    //   //   onLogin(); // Appel du callback
    //   //   setLoading(false);
        
    //   // }, 800);
    //   console.log('sxdrcfvgbhnj,k')
      
    // } else {
    //   setError("Matricule ou mot de passe incorrect");
    //   setLoading(false);
    // }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
          <h2 className="text-2xl font-bold">Connexion</h2>
          <p className="text-blue-100 mt-2">CIVS - Contrôle Interne de la Vie du Service</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">
              Matricule
            </label>
            <input
              id="matricule"
              type="text"
              name="matricule"
              value={form.matricule}
              onChange={handleInputChange}
              placeholder="Entrez votre matricule"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Entrez votre mot de passe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              loading
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
            } text-white font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02]`}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
