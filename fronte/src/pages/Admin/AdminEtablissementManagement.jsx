// Dans AdminManagement.jsx

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const staticAdmins = [
  {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
    {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
    {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
  {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
    {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
    {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
  {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
    {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
    {
    id: 1,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    employeeNumber: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    organization: 'Rabat',
  },
  // Ajoute plus si besoin
];

const PAGE_SIZE = 5;

const AdminManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterEmployeeNumber, setFilterEmployeeNumber] = useState('');
  const [filterOrganization, setFilterOrganization] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState(null);

  // Champs du formulaire modal
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeNumber: '',
    email: '',
    password: '',
    organization: '',
    profilePhoto: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const organizations = useMemo(() => {
    const orgSet = new Set(staticAdmins.map((admin) => admin.organization));
    return Array.from(orgSet);
  }, []);

  const filteredAdmins = useMemo(() => {
    return staticAdmins.filter((admin) => {
      const fullName = (admin.firstName + ' ' + admin.lastName).toLowerCase();
      const nameMatch = fullName.includes(filterName.toLowerCase());
      const empNumMatch = admin.employeeNumber.toLowerCase().includes(filterEmployeeNumber.toLowerCase());
      const orgMatch = filterOrganization ? admin.organization === filterOrganization : true;
      return nameMatch && empNumMatch && orgMatch;
    });
  }, [filterName, filterEmployeeNumber, filterOrganization]);

  const totalPages = Math.ceil(filteredAdmins.length / PAGE_SIZE);

  const currentAdmins = filteredAdmins.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const openDeleteModal = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setAdminToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    console.log('Deleted admin:', adminToDelete);
    closeDeleteModal();
  };

  const openEditModal = (admin) => {
    setAdminToEdit(admin);
    setFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      employeeNumber: admin.employeeNumber,
      email: admin.email,
      password: '********',
      organization: admin.organization,
      profilePhoto: admin.profilePhoto,
    });
    setImagePreview(admin.profilePhoto);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setAdminToEdit(null);
    setShowEditModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      employeeNumber: '',
      email: '',
      password: '',
      organization: '',
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
    console.log('New admin data:', formData);
    setShowAddModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      employeeNumber: '',
      email: '',
      password: '',
      organization: '',
      profilePhoto: null,
    });
    setImagePreview(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Edited admin data:', formData);
    closeEditModal();
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar page={"Gestion des Administrateurs des etablessment"}/>
        <main className="p-6 flex-grow overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"></h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Ajouter un nouvel administrateur
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
          </div>

          {/* Tableau des admins */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Photo</th>
                  <th className="px-6 py-3">Matricule</th>
                  <th className="px-6 py-3">Prénom</th>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4"><img src={admin.profilePhoto} className="w-10 h-10 rounded-full" /></td>
                    <td className="px-6 py-4">{admin.employeeNumber}</td>
                    <td className="px-6 py-4">{admin.firstName}</td>
                    <td className="px-6 py-4">{admin.lastName}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button onClick={() => openEditModal(admin)} className="text-blue-600"><Edit2 size={18} /></button>
                      <button onClick={() => openDeleteModal(admin)} className="text-red-600"><Trash2 size={18} /></button>
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
                <h2 className="text-xl font-bold mb-4">Nouvel Administrateur</h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Photo de profil</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} className="mt-2 w-20 h-20 rounded-full" />}
                  </div>
                  <div className="flex gap-2">
                    <input name="firstName" placeholder="Prénom" onChange={handleInputChange} value={formData.firstName} className="w-1/2 px-3 py-2 border rounded" />
                    <input name="lastName" placeholder="Nom" onChange={handleInputChange} value={formData.lastName} className="w-1/2 px-3 py-2 border rounded" />
                  </div>
                  <input name="employeeNumber" placeholder="Matricule" onChange={handleInputChange} value={formData.employeeNumber} className="w-full px-3 py-2 border rounded" />
                  <input name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className="w-full px-3 py-2 border rounded" />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Mot de passe"
                      onChange={handleInputChange}
                      value={formData.password}
                      className="w-full px-3 py-2 border rounded pr-10"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>

                  <select name="organization" onChange={handleInputChange} value={formData.organization} className="w-full px-3 py-2 border rounded">
                    <option value="">Choisir un établissement</option>
                    {organizations.map((org) => (
                      <option key={org} value={org}>{org}</option>
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
                <h2 className="text-xl font-bold mb-4">Modifier Administrateur</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Photo de profil</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} className="mt-2 w-20 h-20 rounded-full" />}
                  </div>
                  <div className="flex gap-2">
                    <input name="firstName" placeholder="Prénom" onChange={handleInputChange} value={formData.firstName} className="w-1/2 px-3 py-2 border rounded" />
                    <input name="lastName" placeholder="Nom" onChange={handleInputChange} value={formData.lastName} className="w-1/2 px-3 py-2 border rounded" />
                  </div>
                  <input name="employeeNumber" placeholder="Matricule" onChange={handleInputChange} value={formData.employeeNumber} className="w-full px-3 py-2 border rounded" />
                  <input name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className="w-full px-3 py-2 border rounded" />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Mot de passe"
                      onChange={handleInputChange}
                      value={formData.password}
                      className="w-full px-3 py-2 border rounded pr-10"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>

                  <select name="organization" onChange={handleInputChange} value={formData.organization} className="w-full px-3 py-2 border rounded">
                    <option value="">Choisir un établissement</option>
                    {organizations.map((org) => (
                      <option key={org} value={org}>{org}</option>
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
                <p>Supprimer <strong>{adminToDelete.firstName} {adminToDelete.lastName}</strong> ?</p>
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

export default AdminManagement;