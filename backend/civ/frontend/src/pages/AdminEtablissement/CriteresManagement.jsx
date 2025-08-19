import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/AdminEtablissement/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2 } from 'lucide-react';

const mockCriteres = [
  { id: 1, reponse: 'Réponse 1', coefficient: 5 },
  { id: 2, reponse: 'Réponse 2', coefficient: 3 },
  { id: 3, reponse: 'Réponse 3', coefficient: 4 },
];

const CriteresManagement = () => {
  const { prNumber } = useParams();
  const navigate = useNavigate();

  // Mock designation for the procedure
  const designation = `Procédure ${prNumber}`;

  const [criteres, setCriteres] = useState(mockCriteres);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCritere, setCurrentCritere] = useState(null);
  const [formData, setFormData] = useState({ reponse: '', coefficient: '' });

  const openAddModal = () => {
    setFormData({ reponse: '', coefficient: '' });
    setShowAddModal(true);
  };

  const openEditModal = (critere) => {
    setCurrentCritere(critere);
    setFormData({ reponse: critere.reponse, coefficient: critere.coefficient });
    setShowEditModal(true);
  };

  const openDeleteModal = (critere) => {
    setCurrentCritere(critere);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentCritere(null);
    setFormData({ reponse: '', coefficient: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newCritere = {
      id: criteres.length + 1,
      reponse: formData.reponse,
      coefficient: parseInt(formData.coefficient, 10),
    };
    setCriteres(prev => [...prev, newCritere]);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCriteres(prev =>
      prev.map(c =>
        c.id === currentCritere.id
          ? { ...c, reponse: formData.reponse, coefficient: parseInt(formData.coefficient, 10) }
          : c
      )
    );
    closeModals();
  };

  const handleDeleteConfirm = () => {
    setCriteres(prev => prev.filter(c => c.id !== currentCritere.id));
    closeModals();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion des critères"}/>
        <main className="p-6 flex-grow overflow-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Retour
          </button>
          <h1 className="text-2xl font-bold mb-4">Gestion des critères de la procédure {prNumber}</h1>
          <h2 className="text-xl mb-6">Désignation: {designation}</h2>
          <button
            onClick={openAddModal}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter une nouvelle réponse
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réponse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coefficient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {criteres.map((crit) => (
                  <tr key={crit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crit.reponse}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crit.coefficient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(crit)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(crit)}
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
                <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle réponse</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Réponse</label>
                    <input
                      type="text"
                      name="reponse"
                      value={formData.reponse}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Coefficient</label>
                    <input
                      type="number"
                      name="coefficient"
                      value={formData.coefficient}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                      min={0}
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
                <h2 className="text-xl font-bold mb-4">Modifier la réponse</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Réponse</label>
                    <input
                      type="text"
                      name="reponse"
                      value={formData.reponse}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Coefficient</label>
                    <input
                      type="number"
                      name="coefficient"
                      value={formData.coefficient}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                      min={0}
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
                  Êtes-vous sûr de vouloir supprimer la réponse{' '}
                  <strong>{currentCritere?.reponse}</strong> ?
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

export default CriteresManagement;
