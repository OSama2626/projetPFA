import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2 } from 'lucide-react';

const mockCentres = [
  { id: 1, name: 'centre_1' },
  { id: 2, name: 'centre_2' },
  { id: 3, name: 'centre_3' },
];

const mockAntennes = [
  { id: 1, name: 'antenne_1', centreId: 1 },
  { id: 2, name: 'antenne_2', centreId: 2 },
  { id: 3, name: 'antenne_3', centreId: 1 },
];

const AntenneManagement = () => {
  const [antennes, setAntennes] = useState(mockAntennes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAntenne, setCurrentAntenne] = useState(null);
  const [formData, setFormData] = useState({ centreId: '', name: '' });

  const openAddModal = () => {
    setFormData({ centreId: '', name: '' });
    setShowAddModal(true);
  };

  const openEditModal = (antenne) => {
    setCurrentAntenne(antenne);
    setFormData({ centreId: antenne.centreId, name: antenne.name });
    setShowEditModal(true);
  };

  const openDeleteModal = (antenne) => {
    setCurrentAntenne(antenne);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentAntenne(null);
    setFormData({ centreId: '', name: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newAntenne = {
      id: antennes.length + 1,
      centreId: parseInt(formData.centreId, 10),
      name: formData.name,
    };
    setAntennes(prev => [...prev, newAntenne]);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAntennes(prev =>
      prev.map(a =>
        a.id === currentAntenne.id
          ? { ...a, centreId: parseInt(formData.centreId, 10), name: formData.name }
          : a
      )
    );
    closeModals();
  };

  const handleDeleteConfirm = () => {
    setAntennes(prev => prev.filter(a => a.id !== currentAntenne.id));
    closeModals();
  };

  const getCentreName = (id) => {
    const centre = mockCentres.find(c => c.id === id);
    return centre ? centre.name : '';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion des Antennes"}/>
        <main className="p-6 flex-grow overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Gestion des Antennes</h1>
          <button
            onClick={openAddModal}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter une nouvelle antenne
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antenne</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Centre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {antennes.map((antenne) => (
                  <tr key={antenne.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{antenne.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getCentreName(antenne.centreId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(antenne)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(antenne)}
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
                <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle antenne</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Centre</label>
                    <select
                      name="centreId"
                      value={formData.centreId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un centre</option>
                      {mockCentres.map((centre) => (
                        <option key={centre.id} value={centre.id}>
                          {centre.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nom de l'antenne</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                <h2 className="text-xl font-bold mb-4">Modifier l'antenne</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Centre</label>
                    <select
                      name="centreId"
                      value={formData.centreId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un centre</option>
                      {mockCentres.map((centre) => (
                        <option key={centre.id} value={centre.id}>
                          {centre.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nom de l'antenne</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                  Êtes-vous sûr de vouloir supprimer l'antenne{' '}
                  <strong>{currentAntenne?.name}</strong> ?
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

export default AntenneManagement;
