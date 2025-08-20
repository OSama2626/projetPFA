

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/AdminEtablissement/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2, FileText } from 'lucide-react';

const mockProcedures = [
  {
    prNumber: 1,
    designation: 'Procédure 1',
    criteresCount: 3,
  },
  {
    prNumber: 2,
    designation: 'Procédure 2',
    criteresCount: 5,
  },
  {
    prNumber: 3,
    designation: 'Procédure 3',
    criteresCount: 2,
  },
  {
    prNumber: 4,
    designation: 'Procédure 4',
    criteresCount: 4,
  },
];

const ProcedureManagement = () => {
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProcedure, setCurrentProcedure] = useState(null);
  const [designationInput, setDesignationInput] = useState('');

  const handleViewCriteres = (prNumber) => {
    // Navigate to criteria CRUD page for the procedure
    navigate(`/admin-etablissement/procedure/${prNumber}/criteres`);
  };

  const openAddModal = () => {
    setDesignationInput('');
    setShowAddModal(true);
  };

  const openEditModal = (procedure) => {
    setCurrentProcedure(procedure);
    setDesignationInput(procedure.designation);
    setShowEditModal(true);
  };

  const openDeleteModal = (procedure) => {
    setCurrentProcedure(procedure);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentProcedure(null);
    setDesignationInput('');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    // Add procedure logic here
    alert(`Added procedure: ${designationInput}`);
    closeModals();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Edit procedure logic here
    alert(`Edited procedure: ${designationInput}`);
    closeModals();
  };

  const handleDeleteConfirm = () => {
    // Delete procedure logic here
    alert(`Deleted procedure: ${currentProcedure.designation}`);
    closeModals();
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar page={"Gestion des Procédures (Sécurité de l'exploitation ferroviaire)"}/>
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
            Ajouter une nouvelle procédure
          </button>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° PR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation PR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Critère de contrôle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockProcedures.map((proc) => (
                  <tr key={proc.prNumber} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proc.prNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{proc.designation}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <button
                        onClick={() => handleViewCriteres(proc.prNumber)}
                        className="flex items-center text-indigo-600 hover:text-indigo-900"
                        title="Voir critères"
                      >
                        <FileText className="mr-1" size={18} />
                        {proc.criteresCount} critères
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4">
                      <button
                        onClick={() => openEditModal(proc)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(proc)}
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
                <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle procédure</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Désignation</label>
                    <input
                      type="text"
                      value={designationInput}
                      onChange={(e) => setDesignationInput(e.target.value)}
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
                <h2 className="text-xl font-bold mb-4">Modifier la procédure</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Désignation</label>
                    <input
                      type="text"
                      value={designationInput}
                      onChange={(e) => setDesignationInput(e.target.value)}
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
                  Êtes-vous sûr de vouloir supprimer la procédure{' '}
                  <strong>{currentProcedure?.designation}</strong> ?
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

export default ProcedureManagement;
