import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Trash2, Edit2, Eye, Download, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const mockData = [
  {
    id: 1,
    trimestre: 'T1',
    etablissement: 'etablissement_1',
    centre: 'centre_2',
    antenne: 'antenne_1',
    annee: 2025,
  },
  {
    id: 2,
    trimestre: 'T1',
    etablissement: 'etablissement_2',
    centre: 'centre_1',
    antenne: 'antenne_7',
    annee: 2025,
  },
  {
    id: 3,
    trimestre: 'T2',
    etablissement: 'etablissement_3',
    centre: 'centre_4',
    antenne: 'antenne_5',
    annee: 2024,
  },
  {
    id: 4,
    trimestre: 'T3',
    etablissement: 'etablissement_1',
    centre: 'centre_7',
    antenne: 'antenne_2',
    annee: 2025,
  },
  {
    id: 5,
    trimestre: 'T4',
    etablissement: 'etablissement_4',
    centre: 'centre_2',
    antenne: 'antenne_8',
    annee: 2025,
  },
  {
    id: 6,
    trimestre: 'T4',
    etablissement: 'etablissement_2',
    centre: 'centre_3',
    antenne: 'antenne_1',
    annee: 2023,
  },
];

const ControleAPosterioriManagement = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    annee: '',
    trimestre: '',
    etablissement: '',
    centre: '',
    antenne: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const PAGE_SIZE = 5;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      annee: '',
      trimestre: '',
      etablissement: '',
      centre: '',
      antenne: '',
    });
  };

  const filteredData = mockData.filter((item) => {
    return (
      (filters.annee === '' || item.annee.toString().includes(filters.annee)) &&
      (filters.trimestre === '' || item.trimestre === filters.trimestre) &&
      (filters.etablissement === '' || item.etablissement === filters.etablissement) &&
      (filters.centre === '' || item.centre === filters.centre) &&
      (filters.antenne === '' || item.antenne === filters.antenne)
    );
  });

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const currentData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Options for selects
  const trimestreOptions = ['T1', 'T2', 'T3', 'T4'];
  const etablissementOptions = ['etablissement_1', 'etablissement_2', 'etablissement_3', 'etablissement_4'];
  const centreOptions = ['centre_1', 'centre_2', 'centre_3', 'centre_4', 'centre_7'];
  const antenneOptions = ['antenne_1', 'antenne_2', 'antenne_5', 'antenne_7', 'antenne_8'];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Gestion des PPOP du controle à posteriori"}/>
        <main className="p-6 flex-grow overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"></h1>
            <button
              onClick={() => navigate('/controle-a-posteriori/add')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Ajouter
            </button>
          </div>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer mb-4"
              onClick={() => setExpandedFilters(!expandedFilters)}
            >
              <h2 className="text-lg font-semibold">Filtres</h2>
              {expandedFilters ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                  <input
                    type="text"
                    name="annee"
                    placeholder="Filtrer par année"
                    value={filters.annee}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trimestre</label>
                  <select
                    name="trimestre"
                    value={filters.trimestre}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les trimestres</option>
                    {trimestreOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Établissement</label>
                  <select
                    name="etablissement"
                    value={filters.etablissement}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les établissements</option>
                    {etablissementOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Centre</label>
                  <select
                    name="centre"
                    value={filters.centre}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les centres</option>
                    {centreOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Antenne</label>
                  <select
                    name="antenne"
                    value={filters.antenne}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les antennes</option>
                    {antenneOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tableau */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Année
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trimestre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Établissement
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Centre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Antenne
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.annee}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.trimestre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.etablissement}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.centre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.antenne}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-3">
                          <button
                            onClick={() => navigate(`/controle-a-posteriori/${item.id}`)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Voir détails"
                          >
                            <Eye size={18} />
                          </button>
                          
                          <button
                            onClick={() => alert('Supprimer ' + item.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => alert('Télécharger ' + item.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Télécharger"
                          >
                            <Download size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        Aucun résultat trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
          )}
        </main>
      </div>
    </div>
  );
};

export default ControleAPosterioriManagement;