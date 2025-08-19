// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserIcon from '../assets/icons/User.png';

// const pageTitles = {
//   '/dashboard': 'Tableau de Bord',
//   '/login': 'Login',
//   '/admin-management': 'Gestion des Administrateurs',
//   '/inspecteur-management': 'Gestion des Inspecteurs',
//   '/kn1-management': 'Gestion des Responsables KN1',
//   '/kn2-management': 'Gestion des Responsables KN2',
//   '/kn3-management': 'Gestion des Responsables KN3',
//   '/collaborateur-management': 'Gestion des collaborateurs',
//   '/controle-a-priori':'Gestion des PR/DOC du contrôle à priori',
//   '/controle-a-priori/1':'Détail de PR/DOC du contrôle à priori'
// };

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const currentPage = pageTitles[location.pathname] || 'Page';
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const user = {
//     name: 'John Doe',
//     avatar: UserIcon,
//   };

//   // Fermer le menu si clic en dehors
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="p-4">
//       <nav className="w-full flex items-center justify-between bg-white text-dark-purple px-6 py-4 rounded-2xl shadow-md border border-gray-200 relative">
//         {/* Titre de la page */}
//         <div className="text-2xl font-semibold text-dark-purple tracking-wide">
//           {currentPage}
//         </div>

//         {/* Profil utilisateur avec dropdown */}
//         <div className="relative" ref={dropdownRef}>
//           <div
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center gap-4 bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 shadow-inner"
//           >
//             <img
//               src={user.avatar}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
//             />
//             <div className="hidden md:block text-left">
//               <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
//               <p className="text-blue-500 text-xs">Connecté</p>
//             </div>
//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//               <button
//                 onClick={() => {
//                   navigate('/profile');
//                   setDropdownOpen(false);
//                 }}
//                 className="block w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-gray-700"
//               >
//                 Voir le profil
//               </button>
//               <button
//                 onClick={() => {
//                   navigate('/login');
//                 }}
//                 className="block w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600"
//               >
//                 Déconnexion
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserIcon from '../assets/icons/User.png';


const Navbar = ({ page }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = {
    name: 'Houssam Bendour',
    avatar: UserIcon,
  };

  // Déterminer le titre de la page
  const currentPage = page || (
    {
      '/dashboard': 'Tableau de Bord',
      '/login': 'Login',
      '/admin-management': 'Gestion des Administrateurs',
      '/inspecteur-management': 'Gestion des Inspecteurs',
      '/kn1-management': 'Gestion des Responsables KN1',
      '/kn2-management': 'Gestion des Responsables KN2',
      '/kn3-management': 'Gestion des Responsables KN3',
      '/collaborateur-management': 'Gestion des collaborateurs',
      '/controle-a-priori':'Gestion des PR/DOC du contrôle à priori',
      '/controle-a-priori/1':'Détail de PR/DOC du contrôle à priori'
    }[location.pathname] || 'Page'
  );

  // Fermer le menu si clic en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      <nav className="w-full flex items-center justify-between bg-white text-dark-purple px-6 py-4 rounded-2xl shadow-md border border-gray-200 relative">
        {/* Titre de la page */}
        <div className="text-2xl font-semibold text-dark-purple tracking-wide">
          {currentPage}
        </div>

        {/* Profil utilisateur avec dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-4 bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 shadow-inner"
          >
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
              <p className="text-blue-500 text-xs">Connecté</p>
            </div>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => {
                  navigate('/profile');
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-gray-700"
              >
                Voir le profil
              </button>
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className="block w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;