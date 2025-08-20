import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { User, Edit, Lock, Mail } from 'lucide-react';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    profilePhoto: null,
    firstName: 'Houssam',
    lastName: 'Bendour',
    employeeNumber: 'EMP1234',
    email: 'houssam.bendour@example.com',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profil mis à jour avec succès');
    setShowEditModal(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }
    alert('Mot de passe modifié avec succès');
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page="Profil" />
        <main className="p-6 flex-grow overflow-auto max-w-4xl mx-auto">

            <form onSubmit={handleProfileSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={imagePreview || '/src/assets/icons/User.png'}
                    alt="Photo de profil"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700"
                    title="Changer la photo de profil"
                  >
                    <Edit size={20} />
                  </label>
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <User size={16} /> Prénom
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <User size={16} /> Nom
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <User size={16} /> Matricule
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <Lock size={18} />
                  Modifier le mot de passe
                </button>
              </div>

              {showPasswordChange && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4 bg-gray-50 p-4 rounded border border-gray-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPasswordChange(false)}
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
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;


// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import { User, Edit, Lock, Mail, X } from 'lucide-react';

// const ProfilePage = () => {
//   const [formData, setFormData] = useState({
//     profilePhoto: null,
//     firstName: 'Houssam',
//     lastName: 'Bendour',
//     employeeNumber: 'EMP1234',
//     email: 'houssam.bendour@example.com',
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showPasswordChange, setShowPasswordChange] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, profilePhoto: file }));
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleProfileSubmit = (e) => {
//     e.preventDefault();
//     alert('Profil mis à jour avec succès');
//     setShowEditModal(false);
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert('Le nouveau mot de passe et la confirmation ne correspondent pas.');
//       return;
//     }
//     alert('Mot de passe modifié avec succès');
//     setShowPasswordChange(false);
//     setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//   };

//   const closeModal = () => {
//     setShowEditModal(false);
//     setShowPasswordChange(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-grow flex flex-col">
//         <Navbar page="Profil Utilisateur" />
//         <main className="p-6 flex-grow overflow-auto max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8">Profil Utilisateur</h1>

//           {/* Profile display */}
//           <div className="bg-white rounded-lg shadow p-6 mb-6 flex items-center gap-6">
//             <div className="relative">
//               <img
//                 src={imagePreview || '/src/assets/icons/User.png'}
//                 alt="Photo de profil"
//                 className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
//               />
//             </div>
//             <div>
//               <p className="text-lg font-semibold">{formData.firstName} {formData.lastName}</p>
//               <p className="text-sm text-gray-600">Matricule: {formData.employeeNumber}</p>
//               <p className="text-sm text-gray-600">Email: {formData.email}</p>
//             </div>
//             <button
//               onClick={() => setShowEditModal(true)}
//               className="ml-auto p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
//               title="Modifier le profil"
//             >
//               <Edit size={20} />
//             </button>
//           </div>

//           {/* Edit modal */}
//           {showEditModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
//               <div 
//                 className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-2xl font-bold">Modifier le profil</h2>
//                   <button 
//                     onClick={closeModal}
//                     className="p-1 rounded-full hover:bg-gray-200 transition"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
                
//                 <form onSubmit={handleProfileSubmit} className="space-y-6">
//                   <div className="flex justify-center">
//                     <div className="relative">
//                       <img
//                         src={imagePreview || '/src/assets/icons/User.png'}
//                         alt="Photo de profil"
//                         className="w-32 h-32 rounded-full object-cover border-2 border-blue-600"
//                       />
//                       <label
//                         htmlFor="profilePhoto"
//                         className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 shadow-md"
//                         title="Changer la photo de profil"
//                       >
//                         <Edit size={20} />
//                       </label>
//                       <input
//                         type="file"
//                         id="profilePhoto"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//                         <User size={16} /> Prénom
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//                         <User size={16} /> Nom
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//                         <User size={16} /> Matricule
//                       </label>
//                       <input
//                         type="text"
//                         name="employeeNumber"
//                         value={formData.employeeNumber}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//                         <Mail size={16} /> Email
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <button
//                       type="button"
//                       onClick={() => setShowPasswordChange(!showPasswordChange)}
//                       className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
//                     >
//                       <Lock size={18} />
//                       {showPasswordChange ? 'Masquer le changement de mot de passe' : 'Modifier le mot de passe'}
//                     </button>
//                   </div>

//                   {showPasswordChange && (
//                     <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-300">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
//                         <input
//                           type="password"
//                           name="currentPassword"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordChange}
//                           className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
//                         <input
//                           type="password"
//                           name="newPassword"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordChange}
//                           className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
//                         <input
//                           type="password"
//                           name="confirmPassword"
//                           value={passwordData.confirmPassword}
//                           onChange={handlePasswordChange}
//                           className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           required
//                         />
//                       </div>
//                       <div className="flex justify-end gap-3">
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswordChange(false)}
//                           className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
//                         >
//                           Annuler
//                         </button>
//                         <button
//                           type="button"
//                           onClick={handlePasswordSubmit}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                         >
//                           Enregistrer
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-end gap-3 pt-4">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
//                     >
//                       Annuler
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2"
//                     >
//                       Enregistrer les modifications
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;