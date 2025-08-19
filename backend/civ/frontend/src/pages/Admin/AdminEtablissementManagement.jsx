import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import api from '../../api';

const PAGE_SIZE = 5;

const AdminEtablissementManagement = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterEmployeeNumber, setFilterEmployeeNumber] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeNumber: '',
    email: '',
    password: '',
    etablissement_id: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin_etablissement/all');
        setAdmins(response.data.content);
        setError(null);
      } catch (err) {
        setError("Failed to fetch admins.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const fullName = (admin.prenom + ' ' + admin.nom).toLowerCase();
      const nameMatch = fullName.includes(filterName.toLowerCase());
      const empNumMatch = admin.matricule.toLowerCase().includes(filterEmployeeNumber.toLowerCase());
      return nameMatch && empNumMatch;
    });
  }, [admins, filterName, filterEmployeeNumber]);

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
    console.log('Delete functionality not implemented yet.');
    // Implement API call to delete admin when available
    // await api.delete(`/admin_etablissement/${adminToDelete.id}`);
    closeDeleteModal();
  };

  const openEditModal = (admin) => {
    setAdminToEdit(admin);
    setFormData({
      firstName: admin.prenom,
      lastName: admin.nom,
      employeeNumber: admin.matricule,
      email: admin.email,
      password: '********',
      etablissement_id: admin.etablissement_id,
    });
    // Assuming profile photo handling will be added
    setImagePreview(null);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setAdminToEdit(null);
    setShowEditModal(false);
    resetFormData();
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

  const resetFormData = () => {
    setFormData({
        firstName: '',
        lastName: '',
        employeeNumber: '',
        email: '',
        password: '',
        etablissement_id: '',
    });
    setImagePreview(null);
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert names to match DTO
      const postData = {
          nom: formData.lastName,
          prenom: formData.firstName,
          matricule: formData.employeeNumber,
          email: formData.email,
          password: formData.password,
          etablissement_id: formData.etablissement_id,
      }
      const response = await api.post('/admin_etablissement/create', postData);
      setAdmins([...admins, response.data]);
      setShowAddModal(false);
      resetFormData();
    } catch (err) {
      setError('Failed to add admin.');
      console.error(err);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Edit functionality not implemented yet.');
    // Implement API call to update admin when available
    // await api.put(`/admin_etablissement/${adminToEdit.id}`, formData);
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

          {/* Filters */}
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

          {/* Admins Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                      <td className="px-6 py-4">{admin.matricule}</td>
                      <td className="px-6 py-4">{admin.prenom}</td>
                      <td className="px-6 py-4">{admin.nom}</td>
                      <td className="px-6 py-4">{admin.email}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button onClick={() => openEditModal(admin)} className="text-blue-600"><Edit2 size={18} /></button>
                        <button onClick={() => openDeleteModal(admin)} className="text-red-600"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination would go here */}

        </main>
      </div>
       {/* Modals will go here */}
    </div>
  );
};

export default AdminEtablissementManagement;