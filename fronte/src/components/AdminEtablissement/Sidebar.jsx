import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import ChartFillIcon from '../../Assets/icons/Chart_fill.png';
import StructureIcon from '../../Assets/icons/Structure.png';
import UserIcon from '../../Assets/icons/User.png';
import MaterielIcon from '../../Assets/icons/Materiel.png';
import FolderIcon from '../../Assets/icons/Folder.png';
import LogoutIcon from '../../Assets/icons/Logout.png';
import ControlIcon from '../../Assets/icons/control.png';
import OncfIcon from '../../Assets/icons/oncf.png';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [dropdowns, setDropdowns] = useState({
    users: false,
    criteres: false,
    structure: false,
    materiel: false
  });

  const navigate = useNavigate();

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderDropdownItem = (icon, label, key, items) => (
    <>
      <li
        onClick={() => toggleDropdown(key)}
        className={`flex items-center gap-4 p-2 cursor-pointer ${
          !open ? 'justify-center' : ''
        } group hover:bg-blue-00 rounded-md transition-all duration-300 mt-2`}
      >
        <img src={icon} className="group-hover:scale-110" alt={label} />
        {open && (
          <span className="text-white group-hover:font-bold flex-1 flex justify-between items-center">
            {label}
            <span
              className={`w-4 transform transition-transform duration-300 ${
                dropdowns[key] ? 'rotate-180' : ''
              } text-[10px]`}
            >
              ▼
            </span>
          </span>
        )}
      </li>

      {dropdowns[key] && open && (
        <ul className="ml-8 mt-1 space-y-1">
          {items.map((item) => (
            <li
              key={item}
              className="text-sm text-white p-2 hover:bg-blue-700 rounded-md cursor-pointer transition-all duration-300"
              onClick={() => console.log('Clicked:', item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div className="flex">
        <div className={`${open ? 'w-72' : 'w-20'} h-screen overflow-y-auto scrollbar-hide transition-all duration-500 relative p-4 bg-dark-purple overflow-x-hidden`}>

        {/* Bouton de contrôle */}
        <img
  src={ControlIcon}
  onClick={() => setOpen(!open)}
  className={`
    w-[25px] h-[25px]
    absolute top-6 -right-[12px] z-50
    border-2 border-white bg-white
    rounded-full shadow-md cursor-pointer
    transition-transform duration-500
    ${!open ? 'rotate-180' : ''}
  `}
  alt="toggle"
/>


        {/* Logo */}
        <div className="flex gap-4 items-center">
          <img
            src={OncfIcon}
            className={`w-[100px] duration-500 ${
              !open ? 'rotate-[360deg]' : ''
            }`}
            alt="logo"
          />
        </div>

        {/* Menu */}
        <ul className="mt-10">
          {/* Tableau de Bord */}
          <li
            className={`flex items-center gap-4 p-2 cursor-pointer ${
              !open ? 'justify-center' : ''
            } group hover:bg-blue-800 rounded-md transition-all duration-300 mt-2`}
            onClick={() => navigate('/admin-etablissement/dashboard')}
          >
            <img src={ChartFillIcon} className="group-hover:scale-110" alt="Dashboard" />
            {open && <span className="text-white group-hover:font-bold">Tableau de Bord</span>}
          </li>

          {/* Dropdowns */}
          {renderDropdownItem(UserIcon, 'Users', 'users', [
            <span key="Responsable-KN1" onClick={() => navigate('/admin-etablissement/kn1-management')} className="cursor-pointer">Responsable KN1</span>,
            <span key="Responsable-KN2" onClick={() => navigate('/admin-etablissement/kn2-management')} className="cursor-pointer">Responsable KN2</span>,
            <span key="Responsable-KN3" onClick={() => navigate('/admin-etablissement/kn3-management')} className="cursor-pointer">Responsable KN3</span>,
            <span key="collaborateur" onClick={() => navigate('/admin-etablissement/collaborateur-management')} className="cursor-pointer">Collaborateur</span>
          ])}

{renderDropdownItem(FolderIcon, 'Critères et points de contrôle', 'criteres', [
  <span key="a-priori" onClick={() => navigate('/admin-etablissement/controle-a-priori')} className="cursor-pointer">à priori</span>,
  <span key="sur-le-vif" onClick={() => navigate('/admin-etablissement/controle-sur-vif')} className="cursor-pointer">sur le vif</span>,
  <span key="a-posteriori" onClick={() => navigate('/admin-etablissement/controle-a-posteriori')} className="cursor-pointer">à posteriori</span>
])}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
