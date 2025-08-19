import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const staticKN1Responsibles = [
  {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'KN1001',
    firstName: 'Ahmed',
    lastName: 'Khalil',
    email: 'ahmed.khalil@example.com',
    password: '********',
    function: 'Responsable principal',
    establishment: 'Etablissement Principal',
  },
  {
    id: 2,
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    employeeNumber: 'KN1002',
    firstName: 'Fatima',
    lastName: 'Zahra',
    email: 'fatima.zahra@example.com',
    password: '********',
    function: 'Responsable adjoint',
    establishment: 'Etablissement Secondaire',
  },
  {
    id: 3,
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    employeeNumber: 'KN1003',
    firstName: 'Mehdi',
    lastName: 'Benali',
    email: 'mehdi.benali@example.com',
    password: '********',
    function: 'Coordinateur',
    establishment: 'Etablissement Principal',
  },
];

const PAGE_SIZE = 5;

const KN2Management = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterEmployeeNumber, setFilterEmployeeNumber] = useState('');
  const [filterFunction, setFilterFunction] = useState('');
  const [filterEstablishment, setFilterEstablishment] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [responsibleToDelete, setResponsibleToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [responsibleToEdit, setResponsibleToEdit] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeNumber: '',
    email: '',
    password: '',
    function: '',
    establishment: '',
    profilePhoto: null,
  });

  // Extraire les valeurs uniques pour les filtres
  const functions = useMemo(() => {
    const funcSet = new Set(staticKN1Responsibles.map(resp => resp.function));
    return Array.from(funcSet);
  }, []);

  const establishments = useMemo(() => {
    const estSet = new Set(staticKN1Responsibles.map(resp => resp.establishment));
    return Array.from(estSet);
  }, []);

  const centers = useMemo(() => {
    const centerSet = new Set(staticKN1Responsibles.map(resp => resp.center));
    return Array.from(centerSet);
  }, []);

  const antennas = useMemo(() => {
    const antSet = new Set(staticKN1Responsibles.map(resp => resp.antenna));
    return Array.from(antSet);
  }, []);

  // Filtrage des responsables
  const filteredResponsibles = useMemo(() => {
    return staticKN1Responsibles.filter((resp) => {
      const fullName = `${resp.firstName} ${resp.lastName}`.toLowerCase();
      return (
        fullName.includes(filterName.toLowerCase()) &&
        resp.employeeNumber.toLowerCase().includes(filterEmployeeNumber.toLowerCase()) &&
        (filterFunction ? resp.function === filterFunction : true) &&
        (filterEstablishment ? resp.establishment === filterEstablishment : true)
      );
    });
  }, [filterName, filterEmployeeNumber, filterFunction, filterEstablishment]);

  const totalPages = Math.ceil(filteredResponsibles.length / PAGE_SIZE);
  const currentResponsibles = filteredResponsibles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Gestion des modals
  const openDeleteModal = (responsible) => {
    setResponsibleToDelete(responsible);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setResponsibleToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    console.log('Deleted responsible:', responsibleToDelete);
    closeDeleteModal();
  };

const openEditModal = (responsible) => {
  setResponsibleToEdit(responsible);
  setFormData({
    firstName: responsible.firstName,
    lastName: responsible.lastName,
    employeeNumber: responsible.employeeNumber,
    email: responsible.email,
    password: '********', // Mot de passe masqué par défaut
    function: responsible.function,
    establishment: responsible.establishment,
    center: responsible.center,
    antenna: responsible.antenna,
    profilePhoto: responsible.profilePhoto,
  });
  setImagePreview(responsible.profilePhoto);
  setShowEditModal(true);
};

  const closeEditModal = () => {
    setResponsibleToEdit(null);
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      employeeNumber: '',
      email: '',
      password: '',
      function: '',
      establishment: '',
      profilePhoto: null,
    });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log('New responsible data:', formData);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Edited responsible data:', formData);
    closeEditModal();
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar page={"Gestion des Responsables KN3"}/>
        <main className="p-6 flex-grow overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"></h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Ajouter un nouveau responsable
            </button>
          </div>

          {/* Filtres */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              {functions.map((func) => (
                <option key={func} value={func}>{func}</option>
              ))}
            </select>
            <select
              value={filterEstablishment}
              onChange={(e) => setFilterEstablishment(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="">Tous les établissements</option>
              {establishments.map((est) => (
                <option key={est} value={est}>{est}</option>
              ))}
            </select>
            
          
          </div>

          {/* Tableau des responsables */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Photo</th>
                  <th className="px-6 py-3">Matricule</th>
                  <th className="px-6 py-3">Prénom</th>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Fonction</th>
                  <th className="px-6 py-3">Etablissement</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentResponsibles.map((responsible) => (
                  <tr key={responsible.id}>
                    <td className="px-6 py-4">
                      <img src={responsible.profilePhoto} alt="Profile" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4">{responsible.employeeNumber}</td>
                    <td className="px-6 py-4">{responsible.firstName}</td>
                    <td className="px-6 py-4">{responsible.lastName}</td>
                    <td className="px-6 py-4">{responsible.email}</td>
                    <td className="px-6 py-4">{responsible.function}</td>
                    <td className="px-6 py-4">{responsible.establishment}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button onClick={() => openEditModal(responsible)} className="text-blue-600 hover:text-blue-800">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => openDeleteModal(responsible)} className="text-red-600 hover:text-red-800">
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
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Nouveau Responsable KN3</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Photo de profil</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 rounded-full" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  
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
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Fonction</label>
                    <select
                      name="function"
                      value={formData.function}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionner une fonction</option>
                      {functions.map(func => (
                        <option key={func} value={func}>{func}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="relative">
                    <label className="block mb-1">Mot de passe</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  <div>
                    <label className="block mb-1">Etablissement</label>
                    <select
                      name="establishment"
                      value={formData.establishment}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value="">Sélectionner un établissement</option>
                      {establishments.map(est => (
                        <option key={est} value={est}>{est}</option>
                      ))}
                    </select>
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
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Modifier Responsable KN1</h2>
      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Photo de profil</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="w-full"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 rounded-full" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
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
        </div>

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
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Fonction</label>
          <select
            name="function"
            value={formData.function}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionner une fonction</option>
            {functions.map(func => (
              <option key={func} value={func}>{func}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block mb-1">Mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div>
          <label className="block mb-1">Etablissement</label>
          <select
            name="establishment"
            value={formData.establishment}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionner un établissement</option>
            {establishments.map(est => (
              <option key={est} value={est}>{est}</option>
            ))}
          </select>
        </div>


        

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={closeEditModal}
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
          {/* Modal Suppression */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirmer la suppression</h2>
                <p>
                  Êtes-vous sûr de vouloir supprimer le responsable{' '}
                  <strong>{responsibleToDelete?.firstName} {responsibleToDelete?.lastName}</strong> ?
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

export default KN2Management;