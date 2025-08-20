import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const staticInspectors = [
  {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    password: '********',
    function: 'Inspecteur principal',
    department: 'Département des transports',
    service: 'Contrôle routier',
  },
  {
    id: 2,
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    employeeNumber: 'EMP002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    password: '********',
    function: 'Inspectrice',
    department: 'Département environnement',
    service: 'Contrôle des déchets',
  },
  {
    id: 3,
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    employeeNumber: 'EMP003',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    password: '********',
    function: 'Inspecteur senior',
    department: 'Département des transports',
    service: 'Contrôle technique',
  },
  {
    id: 4,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    password: '********',
    function: 'Inspecteur principal',
    department: 'Département des transports',
    service: 'Contrôle routier',
  },
  {
    id: 5,
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    employeeNumber: 'EMP002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    password: '********',
    function: 'Inspectrice',
    department: 'Département environnement',
    service: 'Contrôle des déchets',
  },
  {
    id: 6,
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    employeeNumber: 'EMP003',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    password: '********',
    function: 'Inspecteur senior',
    department: 'Département des transports',
    service: 'Contrôle technique',
  },
  {
    id: 7,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    password: '********',
    function: 'Inspecteur principal',
    department: 'Département des transports',
    service: 'Contrôle routier',
  },
  {
    id: 8,
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    employeeNumber: 'EMP002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    password: '********',
    function: 'Inspectrice',
    department: 'Département environnement',
    service: 'Contrôle des déchets',
  },
  {
    id: 9,
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    employeeNumber: 'EMP003',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    password: '********',
    function: 'Inspecteur senior',
    department: 'Département des transports',
    service: 'Contrôle technique',
  },
  {
    id: 10,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    password: '********',
    function: 'Inspecteur principal',
    department: 'Département des transports',
    service: 'Contrôle routier',
  },
  {
    id: 11,
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    employeeNumber: 'EMP002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    password: '********',
    function: 'Inspectrice',
    department: 'Département environnement',
    service: 'Contrôle des déchets',
  },
  {
    id: 12,
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    employeeNumber: 'EMP003',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    password: '********',
    function: 'Inspecteur senior',
    department: 'Département des transports',
    service: 'Contrôle technique',
  },
  // Ajoute plus si besoin
];

const PAGE_SIZE = 5;

const InspectorManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterEmployeeNumber, setFilterEmployeeNumber] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterFunction, setFilterFunction] = useState('');
  const [filterService, setFilterService] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inspectorToDelete, setInspectorToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inspectorToEdit, setInspectorToEdit] = useState(null);

  // Champs du formulaire modal
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeNumber: '',
    email: '',
    password: '',
    function: '',
    department: '',
    service: '',
    profilePhoto: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const departments = useMemo(() => {
    const deptSet = new Set(staticInspectors.map((inspector) => inspector.department));
    return Array.from(deptSet);
  }, []);

  const services = useMemo(() => {
    const svcSet = new Set(staticInspectors.map((inspector) => inspector.service));
    return Array.from(svcSet);
  }, []);
// Extraire les fonctions uniques pour les filtres
const functions = useMemo(() => {
  const funcSet = new Set(staticInspectors.map((inspector) => inspector.function));
  return Array.from(funcSet);
}, []);

  const filteredInspectors = useMemo(() => {
  return staticInspectors.filter((inspector) => {
    const fullName = (inspector.firstName + ' ' + inspector.lastName).toLowerCase();
    const nameMatch = fullName.includes(filterName.toLowerCase());
    const empNumMatch = inspector.employeeNumber.toLowerCase().includes(filterEmployeeNumber.toLowerCase());
    const deptMatch = filterDepartment ? inspector.department === filterDepartment : true;
    const funcMatch = filterFunction ? inspector.function === filterFunction : true;
    const svcMatch = filterService ? inspector.service === filterService : true;
    
    return nameMatch && empNumMatch && deptMatch && funcMatch && svcMatch;
  });
}, [filterName, filterEmployeeNumber, filterDepartment, filterFunction, filterService]);


  const totalPages = Math.ceil(filteredInspectors.length / PAGE_SIZE);

  const currentInspectors = filteredInspectors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const openDeleteModal = (inspector) => {
    setInspectorToDelete(inspector);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setInspectorToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    console.log('Deleted inspector:', inspectorToDelete);
    closeDeleteModal();
  };

  const openEditModal = (inspector) => {
    setInspectorToEdit(inspector);
    setFormData({
      firstName: inspector.firstName,
      lastName: inspector.lastName,
      employeeNumber: inspector.employeeNumber,
      email: inspector.email,
      password: '********',
      function: inspector.function,
      department: inspector.department,
      service: inspector.service,
      profilePhoto: inspector.profilePhoto,
    });
    setImagePreview(inspector.profilePhoto);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setInspectorToEdit(null);
    setShowEditModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      employeeNumber: '',
      email: '',
      password: '',
      function: '',
      department: '',
      service: '',
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log('New inspector data:', formData);
    setShowAddModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      employeeNumber: '',
      email: '',
      password: '',
      function: '',
      department: '',
      service: '',
      profilePhoto: null,
    });
    setImagePreview(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Edited inspector data:', formData);
    closeEditModal();
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar page={"Gestion des Inspecteurs"}/>
        <main className="p-6 flex-grow overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"></h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Ajouter un nouvel inspecteur
            </button>
          </div>

          {/* Filtres */}
          <div className="mb-4 flex flex-wrap gap-4">
  <input
    type="text"
    placeholder="Filtrer par nom ou prénom"
    value={filterName}
    onChange={(e) => setFilterName(e.target.value)}
    className="px-4 py-2 border rounded w-64"
  />
  <input
    type="text"
    placeholder="Filtrer par matricule"
    value={filterEmployeeNumber}
    onChange={(e) => setFilterEmployeeNumber(e.target.value)}
    className="px-4 py-2 border rounded w-48"
  />
  <select
    value={filterDepartment}
    onChange={(e) => setFilterDepartment(e.target.value)}
    className="px-4 py-2 border rounded w-64"
  >
    <option value="">Tous les départements</option>
    {departments.map((dept) => (
      <option key={dept} value={dept}>{dept}</option>
    ))}
  </select>
  <select
    value={filterFunction}
    onChange={(e) => setFilterFunction(e.target.value)}
    className="px-4 py-2 border rounded w-64"
  >
    <option value="">Toutes les fonctions</option>
    {functions.map((func) => (
      <option key={func} value={func}>{func}</option>
    ))}
  </select>
  <select
    value={filterService}
    onChange={(e) => setFilterService(e.target.value)}
    className="px-4 py-2 border rounded w-64"
  >
    <option value="">Tous les services</option>
    {services.map((svc) => (
      <option key={svc} value={svc}>{svc}</option>
    ))}
  </select>
</div>

          {/* Tableau des inspecteurs */}
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
                  <th className="px-6 py-3">Département</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentInspectors.map((inspector) => (
                  <tr key={inspector.id}>
                    <td className="px-6 py-4"><img src={inspector.profilePhoto} className="w-10 h-10 rounded-full" alt="Profile" /></td>
                    <td className="px-6 py-4">{inspector.employeeNumber}</td>
                    <td className="px-6 py-4">{inspector.firstName}</td>
                    <td className="px-6 py-4">{inspector.lastName}</td>
                    <td className="px-6 py-4">{inspector.email}</td>
                    <td className="px-6 py-4">{inspector.function}</td>
                    <td className="px-6 py-4">{inspector.department}</td>
                    <td className="px-6 py-4">{inspector.service}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button onClick={() => openEditModal(inspector)} className="text-blue-600"><Edit2 size={18} /></button>
                      <button onClick={() => openDeleteModal(inspector)} className="text-red-600"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>

          {/* === Modal ajout === */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Nouvel Inspecteur</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Photo de profil</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} className="mt-2 w-20 h-20 rounded-full" alt="Preview" />}
                  </div>
                  <div className="flex gap-2">
                    <input name="firstName" placeholder="Prénom" onChange={handleInputChange} value={formData.firstName} className="w-1/2 px-3 py-2 border rounded" required />
                    <input name="lastName" placeholder="Nom" onChange={handleInputChange} value={formData.lastName} className="w-1/2 px-3 py-2 border rounded" required />
                  </div>
                  <input name="employeeNumber" placeholder="Matricule" onChange={handleInputChange} value={formData.employeeNumber} className="w-full px-3 py-2 border rounded" required />
                  <input name="email" type="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className="w-full px-3 py-2 border rounded" required />
                  <input name="function" placeholder="Fonction" onChange={handleInputChange} value={formData.function} className="w-full px-3 py-2 border rounded" required />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Mot de passe"
                      onChange={handleInputChange}
                      value={formData.password}
                      className="w-full px-3 py-2 border rounded pr-10"
                      required
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>

                  <select name="department" onChange={handleInputChange} value={formData.department} className="w-full px-3 py-2 border rounded" required>
                    <option value="">Choisir un département</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  <select name="service" onChange={handleInputChange} value={formData.service} className="w-full px-3 py-2 border rounded" required>
                    <option value="">Choisir un service</option>
                    {services.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* === Modal modification === */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Modifier Inspecteur</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Photo de profil</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} className="mt-2 w-20 h-20 rounded-full" alt="Preview" />}
                  </div>
                  <div className="flex gap-2">
                    <input name="firstName" placeholder="Prénom" onChange={handleInputChange} value={formData.firstName} className="w-1/2 px-3 py-2 border rounded" required />
                    <input name="lastName" placeholder="Nom" onChange={handleInputChange} value={formData.lastName} className="w-1/2 px-3 py-2 border rounded" required />
                  </div>
                  <input name="employeeNumber" placeholder="Matricule" onChange={handleInputChange} value={formData.employeeNumber} className="w-full px-3 py-2 border rounded" required />
                  <input name="email" type="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className="w-full px-3 py-2 border rounded" required />
                  <input name="function" placeholder="Fonction" onChange={handleInputChange} value={formData.function} className="w-full px-3 py-2 border rounded" required />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Mot de passe"
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded pr-10"
                      required
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>

                  <select name="department" onChange={handleInputChange} value={formData.department} className="w-full px-3 py-2 border rounded" required>
                    <option value="">Choisir un département</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  <select name="service" onChange={handleInputChange} value={formData.service} className="w-full px-3 py-2 border rounded" required>
                    <option value="">Choisir un service</option>
                    {services.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Enregistrer</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* === Modal suppression === */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirmer la suppression</h2>
                <p>Supprimer <strong>{inspectorToDelete?.firstName} {inspectorToDelete?.lastName}</strong> ?</p>
                <div className="mt-6 flex justify-end gap-4">
                  <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
                  <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Supprimer</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InspectorManagement;