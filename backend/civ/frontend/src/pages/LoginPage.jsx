import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/login', form);
      const { access_token, refresh_token, role } = response.data;

      // Store tokens and role in local storage or state management
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('userRole', role);
      
      if(onLogin) onLogin(); // Call the callback

      // Redirect based on role
      switch (role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'ADMIN_ETABLISSEMENT':
          navigate('/admin-etablissement/dashboard');
          break;
        // Add cases for other roles if needed
        default:
          navigate('/dashboard'); // Default dashboard
      }

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Une erreur s'est produite lors de la connexion.");
      }
    } finally {
      setLoading(false);
    }
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
