import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2 } from 'lucide-react';

const mockSites = [
  { id: 1, name: 'Site 1' },
  { id: 2, name: 'Site 2' },
  { id: 3, name: 'Site 3' },
];

const SiteProductionManagement = () => {
  const [sites, setSites] = useState(mockSites);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSite, setCurrentSite] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const openAddModal = () => {
    setFormData({ name: '' });
    setShowAddModal(true);
  };

  const openEditModal = (site) => {
    setCurrentSite(site);
    setFormData({ name: site.name });
    setShowEditModal(true);
  };

  const openDeleteModal = (site) => {
    setCurrentSite(site);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentSite(null);
    setFormData({ name: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newSite = {
      id: sites.length + 1,
      name: formData.name,
    };
    setSites(prev => [...prev, newSite]);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSites(prev =>
      prev.map(s =>
        s.id === currentSite.id
          ? { ...s, name: formData.name }
          : s
      )
    );
    closeModals();
  };

  const handleDeleteConfirm = () => {
    setSites(prev => prev.filter(s => s.id !== currentSite.id));
    closeModals();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion des Sites de Production"}/>
        <main className="p-6 flex-grow overflow-auto">
          <h1 className="text-2xl font-bold mb-6"></h1>
          <button
            onClick={openAddModal}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter un nouveau site
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sites.map((site) => (
                  <tr key={site.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{site.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(site)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(site)}
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
                <h2 className="text-xl font-bold mb-4">Ajouter un nouveau site</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Nom du site</label>
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
                <h2 className="text-xl font-bold mb-4">Modifier le site</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Nom du site</label>
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
                  Êtes-vous sûr de vouloir supprimer le site{' '}
                  <strong>{currentSite?.name}</strong> ?
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

export default SiteProductionManagement;
