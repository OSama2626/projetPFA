import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2 } from 'lucide-react';

const enginTypes = ['locomotiv', 'auto-motrice', 'RGVM'];

const mockEngins = [
  { id: 1, type: 'locomotiv', serie: 'A123', numero: 101 },
  { id: 2, type: 'auto-motrice', serie: 'B456', numero: 202 },
  { id: 3, type: 'RGVM', serie: 'C789', numero: 303 },
];

const EnginMoteurManagement = () => {
  const [engins, setEngins] = useState(mockEngins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEngin, setCurrentEngin] = useState(null);
  const [formData, setFormData] = useState({ type: '', serie: '', numero: '' });

  const openAddModal = () => {
    setFormData({ type: '', serie: '', numero: '' });
    setShowAddModal(true);
  };

  const openEditModal = (engin) => {
    setCurrentEngin(engin);
    setFormData({ type: engin.type, serie: engin.serie, numero: engin.numero });
    setShowEditModal(true);
  };

  const openDeleteModal = (engin) => {
    setCurrentEngin(engin);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentEngin(null);
    setFormData({ type: '', serie: '', numero: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newEngin = {
      id: engins.length + 1,
      type: formData.type,
      serie: formData.serie,
      numero: Number(formData.numero),
    };
    setEngins(prev => [...prev, newEngin]);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEngins(prev =>
      prev.map(en =>
        en.id === currentEngin.id
          ? { ...en, type: formData.type, serie: formData.serie, numero: Number(formData.numero) }
          : en
      )
    );
    closeModals();
  };

  const handleDeleteConfirm = () => {
    setEngins(prev => prev.filter(en => en.id !== currentEngin.id));
    closeModals();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion des Engins Moteurs"}/>
        <main className="p-6 flex-grow overflow-auto">
          <h1 className="text-2xl font-bold mb-6"></h1>
          <button
            onClick={openAddModal}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter un nouvel engin moteur
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Série</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {engins.map((engin) => (
                  <tr key={engin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{engin.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{engin.serie}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{engin.numero}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(engin)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(engin)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Ajouter un nouvel engin moteur</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      {enginTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Série</label>
                    <input
                      type="text"
                      name="serie"
                      value={formData.serie}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Numéro</label>
                    <input
                      type="number"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModals}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Modifier l'engin moteur</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      {enginTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Série</label>
                    <input
                      type="text"
                      name="serie"
                      value={formData.serie}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Numéro</label>
                    <input
                      type="number"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModals}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirmer la suppression</h2>
                <p>
                  Êtes-vous sûr de vouloir supprimer l'engin moteur{' '}
                  <strong>{currentEngin?.serie}</strong> ?
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={closeModals}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EnginMoteurManagement;
