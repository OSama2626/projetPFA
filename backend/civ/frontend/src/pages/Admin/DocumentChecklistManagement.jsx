import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2 } from 'lucide-react';

const mockDocuments = [
  {
    id: 1,
    designation: '[Désignation DOC]',
    dateApplication: '01-04-2025',
    edition: '01-04-2025',
    version: 2,
    rectificatifs: 1,
    criteres: 'Document existe et à jour',
  },
  {
    id: 2,
    designation: '[Désignation DOC]',
    dateApplication: '789123456',
    edition: 'Designer',
    version: 1,
    rectificatifs: 2,
    criteres: "Doc Existe Tous les rectifs existent mais au moins 1 rectif n'est pas renseigné",
  },
  {
    id: 3,
    designation: '[Désignation DOC]',
    dateApplication: '321654987',
    edition: 'Analyst',
    version: 2,
    rectificatifs: 3,
    criteres: "Doc Existe au moins 1 rectif n'existe pas",
  },
];

const DocumentChecklistManagement = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState(mockDocuments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [formData, setFormData] = useState({
    designation: '',
    dateApplication: '',
    edition: '',
    version: '',
    rectificatifs: '',
    criteres: '',
  });

  const openAddModal = () => {
    setFormData({
      designation: '',
      dateApplication: '',
      edition: '',
      version: '',
      rectificatifs: '',
      criteres: '',
    });
    setShowAddModal(true);
  };

  const openEditModal = (document) => {
    setCurrentDocument(document);
    setFormData({ ...document });
    setShowEditModal(true);
  };

  const openDeleteModal = (document) => {
    setCurrentDocument(document);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentDocument(null);
    setFormData({
      designation: '',
      dateApplication: '',
      edition: '',
      version: '',
      rectificatifs: '',
      criteres: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newDocument = {
      id: documents.length + 1,
      ...formData,
    };
    setDocuments(prev => [...prev, newDocument]);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === currentDocument.id ? { ...currentDocument, ...formData } : doc
      )
    );
    closeModals();
  };

  const handleDeleteConfirm = () => {
    setDocuments(prev => prev.filter(doc => doc.id !== currentDocument.id));
    closeModals();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion du Check-list de contrôle des documents"}/>
        <main className="p-6 flex-grow overflow-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Retour
          </button>
          <h1 className="text-2xl font-bold mb-6"></h1>
          <button
            onClick={openAddModal}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter un nouveau document
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation DOC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edition DOC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rectificatifs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Critères de contrôles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{doc.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.dateApplication}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.edition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.version}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.rectificatifs}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.criteres}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(doc)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(doc)}
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
                <h2 className="text-xl font-bold mb-4">Ajouter un nouveau document</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Désignation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Date d'application</label>
                    <input
                      type="date"
                      name="dateApplication"
                      value={formData.dateApplication}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Edition DOC</label>
                    <input
                      type="date"
                      name="edition"
                      value={formData.edition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Version</label>
                    <input
                      type="number"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Rectificatifs</label>
                    <input
                      type="number"
                      name="rectificatifs"
                      value={formData.rectificatifs}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Critères de contrôles</label>
                    <select
                      name="criteres"
                      value={formData.criteres}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionnez un critère</option>
                      <option value="Existe à jour">Existe à jour</option>
                      <option value="Existe mal renseigné">Existe mal renseigné</option>
                      <option value="Existe non à jour">Existe non à jour</option>
                      <option value="N’existe pas">N’existe pas</option>
                    </select>
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
                <h2 className="text-xl font-bold mb-4">Modifier le document</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Désignation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Date d'application</label>
                    <input
                      type="text"
                      name="dateApplication"
                      value={formData.dateApplication}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Edition DOC</label>
                    <input
                      type="text"
                      name="edition"
                      value={formData.edition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Version</label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Rectificatifs</label>
                    <input
                      type="text"
                      name="rectificatifs"
                      value={formData.rectificatifs}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Critères de contrôles</label>
                    <input
                      type="text"
                      name="criteres"
                      value={formData.criteres}
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
                  Êtes-vous sûr de vouloir supprimer le document{' '}
                  <strong>{currentDocument?.designation}</strong> ?
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

export default DocumentChecklistManagement;
