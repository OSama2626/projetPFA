import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/AdminEtablissement/Sidebar'; 
import Navbar from '../../components/Navbar';
import { Edit2, Trash2, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const staticCollaborateurs = [
  {
    id: 1,
    employeeNumber: 'COL001',
    firstName: 'Jean',
    lastName: 'Dupont',
    function: 'ECT',
    status: 'Opérationnel',
  },
  {
    id: 2,
    employeeNumber: 'COL002',
    firstName: 'Marie',
    lastName: 'Martin',
    function: 'CFT',
    status: 'En cours de formation',
  },
  {
    id: 3,
    employeeNumber: 'COL003',
    firstName: 'Pierre',
    lastName: 'Durand',
    function: 'CTR',
    status: 'Retirer provisoirement',
  },
];

const PAGE_SIZE = 5;

const CollaborateurManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterEmployeeNumber, setFilterEmployeeNumber] = useState('');
  const [filterFunction, setFilterFunction] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collaborateurToDelete, setCollaborateurToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [collaborateurToEdit, setCollaborateurToEdit] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [collaborateurDetails, setCollaborateurDetails] = useState(null);

  // Options pour les selects
  const oracleFunctions = ['ECT', 'EFT', 'CL', 'CTR', 'CRMV', 'CFT', 'DFT', 'Agent Technicien Stagiaire'];
  const exercisedFunctions = ['CL', 'CTR', 'CRMV', 'CFT', 'DFT'];
  const statusOptions = ['Opérationnel', 'En cours de formation', 'Retirer provisoirement', 'Retirer définitivement'];
  const situationOptions = ['affecté', 'détaché'];
  const motorTypes = ['locomotif', 'auto-motrice', 'rgvm'];

  // Données pour les habilitations
  const habilitationLines = ['Ligne 1', 'Ligne 2', 'Ligne 3', 'Ligne 4', 'Ligne 5', 'Ligne 6', 'Ligne 7', 'Ligne 8','Ligne 9', 'Ligne 10', 'Ligne 11', 'Ligne 12', 'Ligne 13', 'Ligne 14',];
  const habilitationSites = ['Site A', 'Site B', 'Site C', 'Site D','Site E', 'Site F', 'Site G', 'Site H','Site I', 'Site J', 'Site K', 'Site L'];

  // Données pour les engins moteurs
  const motorEngines = {
    'locomotif': ['Locomotif 1', 'Locomotif 2', 'Locomotif 3', 'Locomotif 4', 'Locomotif 5', 'Locomotif 6', 'Locomotif 7', 'Locomotif 8', 'Locomotif 9', 'Locomotif 10', 'Locomotif 11', 'Locomotif 2', 'Locomotif 3', 'Locomotif 4', 'Locomotif 5', 'Locomotif 6', 'Locomotif 7', 'Locomotif 8', 'Locomotif 9', 'Locomotif 10', 'Locomotif 11'],
    'auto-motrice': ['Auto-motrice 1', 'Auto-motrice 2'],
    'rgvm': ['RGVM 1', 'RGVM 2', 'RGVM 3']
  };

  // Form data
  const [formData, setFormData] = useState({
    employeeNumber: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    oracleFunction: '',
    exercisedFunction: '',
    status: '',
    situation: '',
    etablissement:'',
    centre:'',
    entenne:'',
    departement:'',
    service:'',
    habilitationLines: [],
    habilitationSites: [],
    motorEngines: []
  });

  const [selectedMotorType, setSelectedMotorType] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  //sdcxvcdvsdv
const DetailItem = ({ icon, label, value }) => {
  const icons = {
    fingerprint: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    cake: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
    briefcase: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    status: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    location: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  return (
    <div className="flex items-start">
      {icons[icon]}
      <div>
        <div className="font-medium text-gray-700">{label}</div>
        <div className="text-gray-900">{value || 'Non spécifié'}</div>
      </div>
    </div>
  );
};
  // Filtrage
  const filteredCollaborateurs = useMemo(() => {
    return staticCollaborateurs.filter((collab) => {
      const fullName = `${collab.firstName} ${collab.lastName}`.toLowerCase();
      return (
        fullName.includes(filterName.toLowerCase()) &&
        collab.employeeNumber.toLowerCase().includes(filterEmployeeNumber.toLowerCase()) &&
        (filterFunction ? collab.function === filterFunction : true) &&
        (filterStatus ? collab.status === filterStatus : true)
      );
    });
  }, [filterName, filterEmployeeNumber, filterFunction, filterStatus]);

  const totalPages = Math.ceil(filteredCollaborateurs.length / PAGE_SIZE);
  const currentCollaborateurs = filteredCollaborateurs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Gestion des modals
  const openDeleteModal = (collab) => {
    setCollaborateurToDelete(collab);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setCollaborateurToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    console.log('Deleted collaborateur:', collaborateurToDelete);
    closeDeleteModal();
  };

  const openEditModal = (collab) => {
    setCollaborateurToEdit(collab);
    setFormData({
      ...formData,
      employeeNumber: collab.employeeNumber,
      firstName: collab.firstName,
      lastName: collab.lastName,
      function: collab.function,
      status: collab.status,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (collab) => {
    setCollaborateurDetails(collab);
    setShowDetailsModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (type, value, isChecked) => {
    setFormData(prev => {
      const currentArray = [...prev[type]];
      if (isChecked) {
        return { ...prev, [type]: [...currentArray, value] };
      } else {
        return { ...prev, [type]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log('New collaborateur data:', formData);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Edited collaborateur data:', formData);
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeNumber: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      oracleFunction: '',
      exercisedFunction: '',
      status: '',
      situation: '',
      habilitationLines: [],
      habilitationSites: [],
      motorEngines: []
    });
    setSelectedMotorType(null);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar page={"Gestion des Collaborateurs"}/>
        <main className="p-6 flex-grow overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"></h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Ajouter un collaborateur
            </button>
          </div>

          {/* Filtres */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Filtrer par nom ou prénom"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filtrer par matricule"
              value={filterEmployeeNumber}
              onChange={(e) => setFilterEmployeeNumber(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            <select
              value={filterFunction}
              onChange={(e) => setFilterFunction(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="">Toutes les fonctions</option>
              {oracleFunctions.map((func) => (
                <option key={func} value={func}>{func}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="">Tous les statuts</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Matricule</th>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Prénom</th>
                  <th className="px-6 py-3">Fonction</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentCollaborateurs.map((collab) => (
                  <tr key={collab.id}>
                    <td className="px-6 py-4">{collab.employeeNumber}</td>
                    <td className="px-6 py-4">{collab.lastName}</td>
                    <td className="px-6 py-4">{collab.firstName}</td>
                    <td className="px-6 py-4">{collab.function}</td>
                    <td className="px-6 py-4">{collab.status}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button 
                        onClick={() => openDetailsModal(collab)} 
                        className="text-blue-600 hover:text-blue-800"
                        title="Détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(collab)} 
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(collab)} 
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

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Précédent
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>

          {/* Modal Ajout */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Ajouter un Collaborateur</h2>
                <form onSubmit={handleAddSubmit}>
                  {/* Section 1 */}
                  <div className="mb-6 border-b pb-4">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection('section1')}
                    >
                      <h3 className="text-lg font-semibold">Informations de base</h3>
                      {expandedSection === 'section1' ? <ChevronUp /> : <ChevronDown />}
                    </div>
                    
                    {expandedSection === 'section1' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block mb-1">Matricule</label>
                          <input
                            type="text"
                            name="employeeNumber"
                            value={formData.employeeNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Nom</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Prénom</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Date de naissance</label>
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Fonction sur Oracle</label>
                          <select
                            name="oracleFunction"
                            value={formData.oracleFunction}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                          >
                            <option value="">Sélectionner</option>
                            {oracleFunctions.map(func => (
                              <option key={func} value={func}>{func}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Fonction exercée</label>
                          <select
                            name="exercisedFunction"
                            value={formData.exercisedFunction}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                          >
                            <option value="">Sélectionner</option>
                            {exercisedFunctions.map(func => (
                              <option key={func} value={func}>{func}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Statut</label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                          >
                            <option value="">Sélectionner</option>
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Situation</label>
                          <select
                            name="situation"
                            value={formData.situation}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          >
                            <option value="">Sélectionner</option>
                            {situationOptions.map(sit => (
                              <option key={sit} value={sit}>{sit}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 2 */}
<div className="mb-6 border-b pb-4">
  <div 
    className="flex justify-between items-center cursor-pointer"
    onClick={() => toggleSection('section2')}
  >
    <h3 className="text-lg font-semibold">Habilitations</h3>
    {expandedSection === 'section2' ? <ChevronUp /> : <ChevronDown />}
  </div>
  
  {expandedSection === 'section2' && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <h4 className="font-medium mb-2">Lignes d'habilitation</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded">
          {habilitationLines.map(line => (
            <div key={line} className="flex items-center">
              <input
                type="checkbox"
                id={`line-${line}`}
                checked={formData.habilitationLines.includes(line)}
                onChange={(e) => handleCheckboxChange('habilitationLines', line, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`line-${line}`}>{line}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2">Sites d'habilitation</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded">
          {habilitationSites.map(site => (
            <div key={site} className="flex items-center">
              <input
                type="checkbox"
                id={`site-${site}`}
                checked={formData.habilitationSites.includes(site)}
                onChange={(e) => handleCheckboxChange('habilitationSites', site, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`site-${site}`}>{site}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>

                  {/* Section 3 */}
<div className="mb-6">
  <div 
    className="flex justify-between items-center cursor-pointer"
    onClick={() => toggleSection('section3')}
  >
    <h3 className="text-lg font-semibold">Engins moteurs</h3>
    {expandedSection === 'section3' ? <ChevronUp /> : <ChevronDown />}
  </div>
  
  {expandedSection === 'section3' && (
    <div className="mt-4">
      <div className="flex space-x-4 mb-4">
        {motorTypes.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedMotorType(type)}
            className={`px-4 py-2 rounded ${selectedMotorType === type ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {type}
          </button>
        ))}
      </div>
      
      {selectedMotorType && (
        <div>
          <h4 className="font-medium mb-2">Sélectionner des {selectedMotorType}s</h4>
          <div className="max-h-60 overflow-y-auto p-2 border rounded">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {motorEngines[selectedMotorType].map(engine => (
                <div key={engine} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`engine-${engine}`}
                    checked={formData.motorEngines.includes(engine)}
                    onChange={(e) => handleCheckboxChange('motorEngines', engine, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`engine-${engine}`}>{engine}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )}
</div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Modification */}
{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Modifier Collaborateur</h2>
      <form onSubmit={handleEditSubmit}>
        {/* Section 1 - Informations de base */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="text-lg font-semibold">Informations de base</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1">Matricule</label>
              <input
                type="text"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Date de naissance</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Fonction sur Oracle</label>
              <select
                name="oracleFunction"
                value={formData.oracleFunction}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Sélectionner</option>
                {oracleFunctions.map(func => (
                  <option key={func} value={func}>{func}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Fonction exercée</label>
              <select
                name="exercisedFunction"
                value={formData.exercisedFunction}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Sélectionner</option>
                {exercisedFunctions.map(func => (
                  <option key={func} value={func}>{func}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Sélectionner</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Situation</label>
              <select
                name="situation"
                value={formData.situation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Sélectionner</option>
                {situationOptions.map(sit => (
                  <option key={sit} value={sit}>{sit}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 - Habilitations */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="text-lg font-semibold">Habilitations</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium mb-2">Lignes d'habilitation</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded">
                {habilitationLines.map(line => (
                  <div key={line} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`line-${line}`}
                      checked={formData.habilitationLines.includes(line)}
                      onChange={(e) => handleCheckboxChange('habilitationLines', line, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`line-${line}`}>{line}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sites d'habilitation</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded">
                {habilitationSites.map(site => (
                  <div key={site} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`site-${site}`}
                      checked={formData.habilitationSites.includes(site)}
                      onChange={(e) => handleCheckboxChange('habilitationSites', site, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`site-${site}`}>{site}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 - Engins moteurs */}
        <div className="mb-6">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="text-lg font-semibold">Engins moteurs</h3>
          </div>
          
          <div className="mt-4">
            <div className="flex space-x-4 mb-4">
              {motorTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedMotorType(type)}
                  className={`px-4 py-2 rounded ${selectedMotorType === type ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            {selectedMotorType && (
              <div>
                <h4 className="font-medium mb-2">Sélectionner des {selectedMotorType}s</h4>
                <div className="max-h-60 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {motorEngines[selectedMotorType].map(engine => (
                      <div key={engine} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`engine-${engine}`}
                          checked={formData.motorEngines.includes(engine)}
                          onChange={(e) => handleCheckboxChange('motorEngines', engine, e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={`engine-${engine}`}>{engine}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
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

          {/* Modal Détails */}
{showDetailsModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Détails du Collaborateur
      </h2>
      
      {/* Section 1 - Informations de base */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Informations de base
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem icon="fingerprint" label="Matricule" value={collaborateurDetails?.employeeNumber} />
          <DetailItem icon="user" label="Nom" value={collaborateurDetails?.lastName} />
          <DetailItem icon="user" label="Prénom" value={collaborateurDetails?.firstName} />
          <DetailItem icon="cake" label="Date de naissance" value={collaborateurDetails?.birthDate} />
          <DetailItem icon="briefcase" label="Fonction Oracle" value={collaborateurDetails?.oracleFunction} />
          <DetailItem icon="briefcase" label="Fonction exercée" value={collaborateurDetails?.exercisedFunction} />
          <DetailItem icon="status" label="Statut" value={collaborateurDetails?.status} />
          <DetailItem icon="location" label="Situation" value={collaborateurDetails?.situation} />
        </div>
      </div>

      {/* Section 2 - Habilitations */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Habilitations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Lignes d'habilitation
            </h4>
            <div className="space-y-1 pl-5">
              {collaborateurDetails?.habilitationLines?.length > 0 ? (
                collaborateurDetails.habilitationLines.map(line => (
                  <div key={line} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">Aucune ligne sélectionnée</div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Sites d'habilitation
            </h4>
            <div className="space-y-1 pl-5">
              {collaborateurDetails?.habilitationSites?.length > 0 ? (
                collaborateurDetails.habilitationSites.map(site => (
                  <div key={site} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {site}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">Aucun site sélectionné</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Engins moteurs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Engins moteurs
        </h3>
        
        <div className="space-y-4">
          {motorTypes.map(type => (
            <div key={type}>
              <h4 className="font-medium mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </h4>
              <div className="space-y-1 pl-5">
                {collaborateurDetails?.motorEngines?.filter(e => motorEngines[type].includes(e)).length > 0 ? (
                  collaborateurDetails.motorEngines
                    .filter(e => motorEngines[type].includes(e))
                    .map(engine => (
                      <div key={engine} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {engine}
                      </div>
                    ))
                ) : (
                  <div className="text-gray-500 italic">Aucun engin sélectionné</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={() => setShowDetailsModal(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Fermer
        </button>
      </div>
    </div>
  </div>
)}

          {/* Modal Suppression */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirmer la suppression</h2>
                <p>
                  Êtes-vous sûr de vouloir supprimer le collaborateur{' '}
                  <strong>{collaborateurToDelete?.firstName} {collaborateurToDelete?.lastName}</strong> ?
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={closeDeleteModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDelete}
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

export default CollaborateurManagement;