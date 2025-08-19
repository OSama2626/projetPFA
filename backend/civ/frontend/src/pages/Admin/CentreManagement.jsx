import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2 } from 'lucide-react';

const mockEtablissements = [
  { id: 1, name: 'etablissement_1' },
  { id: 2, name: 'etablissement_2' },
  { id: 3, name: 'etablissement_3' },
];

const mockCentres = [
  { id: 1, name: 'centre_1', etablissementId: 1, antenneCount: 4 },
  { id: 2, name: 'centre_2', etablissementId: 2, antenneCount: 3 },
  { id: 3, name: 'centre_3', etablissementId: 1, antenneCount: 5 },
];

const CentreManagement = () => {
  const [centres, setCentres] = useState(mockCentres);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCentre, setCurrentCentre] = useState(null);
  const [formData, setFormData] = useState({ etablissementId: '', name: '' });

  const openAddModal = () => {
    setFormData({ etablissementId: '', name: '' });
    setShowAddModal(true);
  };

  const openEditModal = (centre) => {
    setCurrentCentre(centre);
    setFormData({ etablissementId: centre.etablissementId, name: centre.name });
    setShowEditModal(true);
  };

  const openDeleteModal = (centre) => {
    setCurrentCentre(centre);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentCentre(null);
    setFormData({ etablissementId: '', name: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newCentre = {
      id: centres.length + 1,
      etablissementId: parseInt(formData.etablissementId, 10),
      name: formData.name,
      antenneCount: 0,
    };
    setCentres(prev => [...prev, newCentre]);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCentres(prev =>
      prev.map(c =>
        c.id === currentCentre.id
          ? { ...c, etablissementId: parseInt(formData.etablissementId, 10), name: formData.name }
          : c
      )
    );
    closeModals();
  };

  const handleDeleteConfirm = () => {
    setCentres(prev => prev.filter(c => c.id !== currentCentre.id));
    closeModals();
  };

  const getEtablissementName = (id) => {
    const etab = mockEtablissements.find(e => e.id === id);
    return etab ? etab.name : '';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion des Centres"}/>
        <main className="p-6 flex-grow overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Gestion des Centres</h1>
          <button
            onClick={openAddModal}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter un nouveau centre
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Centre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Établissement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre des antennes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {centres.map((centre) => (
                  <tr key={centre.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{centre.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getEtablissementName(centre.etablissementId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{centre.antenneCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(centre)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(centre)}
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
                <h2 className="text-xl font-bold mb-4">Ajouter un nouveau centre</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Établissement</label>
                    <select
                      name="etablissementId"
                      value={formData.etablissementId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un établissement</option>
                      {mockEtablissements.map((etab) => (
                        <option key={etab.id} value={etab.id}>
                          {etab.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nom du centre</label>
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
                <h2 className="text-xl font-bold mb-4">Modifier le centre</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Établissement</label>
                    <select
                      name="etablissementId"
                      value={formData.etablissementId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un établissement</option>
                      {mockEtablissements.map((etab) => (
                        <option key={etab.id} value={etab.id}>
                          {etab.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nom du centre</label>
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
                  Êtes-vous sûr de vouloir supprimer le centre{' '}
                  <strong>{currentCentre?.name}</strong> ?
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

export default CentreManagement;
