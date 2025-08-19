import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Edit2, ArrowLeft, ChevronDown, ChevronUp, FileText, List, Users, Clock } from 'lucide-react';

const mockDetail = {
    id: 1,
  annee: 2025,
  trimestre: 'T1',
  fonction: 'CL',
  etablissement: 'etablissement_2',
  centre: 'centre_1',
  antenne: 'antenne_2',
  procedures: [
    {
      prNumber: 1,
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
    {
      prNumber: 2,
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
    {
      prNumber: 3,
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
    {
      prNumber: 4,
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
  ],
  ppos: [
    {
      prNumber: 1,
      type: 'SEF',
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
    {
      prNumber: 2,
      type: 'SST',
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
    {
      prNumber: 3,
      type: 'SEF',
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
    {
      prNumber: 4,
      type: 'SST',
      designation: '[désignation]',
      criteres: ['[Réponse]', '[Réponse]', '[Réponse]'],
    },
  ],
  documents: [
    {
      id: 1,
      designation: '[Désignation DOC]',
      dateApplication: '01-04-2025',
      edition: '01-04-2025',
      version: 2,
      rectificatifs: 1,
      criteres: 'Document existe et à jour',
    },
    {
      id: 2,
      designation: '[Désignation DOC]',
      dateApplication: '789123456',
      edition: 'Designer',
      version: 1,
      rectificatifs: 2,
      criteres: "Doc Existe Tous les rectifs existent mais au moins 1 rectif n'est pas renseigné",
    },
    {
      id: 3,
      designation: '[Désignation DOC]',
      dateApplication: '321654987',
      edition: 'Analyst',
      version: 2,
      rectificatifs: 3,
      criteres: "Doc Existe au moins 1 rectif n'existe pas",
    },
  ],
  responsable: 'responsable KN3',
  versions: [
    { version: 1, date: '2025-01-15', description: 'Rédaction initiale' },
    { version: 2, date: '2025-03-20', description: 'Mise à jour des responsables' },
    { version: 3, date: '2025-06-10', description: 'Ajout d\'un nouveau collaborateur dans la liste' },
  ],
};

const ControleSurVifDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = mockDetail;
  const [expandedSections, setExpandedSections] = React.useState({
    details: false,
    procedures: false,
    ppos:false,
    documents: false,
    versions: false
  });

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showResponsableModal, setShowResponsableModal] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState({
    annee: detail.annee,
    trimestre: detail.trimestre,
    fonction: detail.fonction,
    etablissement: detail.etablissement,
    centre: detail.centre,
    antenne: detail.antenne,
    responsable: detail.responsable,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Here you would handle saving the edited data
    console.log('Edited details:', editFormData);
    setShowEditModal(false);
  };

  const handleResponsableChange = (e) => {
    const { value } = e.target;
    setEditFormData(prev => ({ ...prev, responsable: value }));
  };

  const handleResponsableSubmit = (e) => {
    e.preventDefault();
    // Here you would handle saving the responsable change
    console.log('Responsable changed to:', editFormData.responsable);
    setShowResponsableModal(false);
  };

  const SectionHeader = ({ icon, title, section }) => (
    <div 
      className="flex justify-between items-center cursor-pointer py-3"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      {expandedSections[section] ? <ChevronUp /> : <ChevronDown />}
    </div>
  );

  const ResponsableModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Modifier le responsable</h2>
        <form onSubmit={handleResponsableSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Responsable</label>
            <select
              name="responsable"
              value={editFormData.responsable}
              onChange={handleResponsableChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="responsable KN1">responsable 1</option>
              <option value="responsable KN2">responsable 2</option>
              <option value="responsable KN3">responsable 3</option>
              <option value="responsable KN4">responsable 4</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowResponsableModal(false)}
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
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Detaille de PR/PPOS/DOC du controle sur le vif "}/>
<main className="p-6 flex-grow overflow-auto" style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 64px)' }}>
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft size={20} className="mr-1" />
              Retour
            </button>
            <h1 className="text-2xl font-bold"></h1>
          </div>

          {/* Détails de la liste */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="border-b">
              <SectionHeader 
                icon={<FileText size={20} className="text-blue-500 ml-6" />}
                title="Détails de la liste" 
                section="details" 
              />
            </div>
            
            {expandedSections.details && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="font-medium w-32">Année:</span>
                      <span>{detail.annee}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Trimestre:</span>
                      <span>{detail.trimestre}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Fonction:</span>
                      <span>{detail.fonction}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="font-medium w-32">Établissement:</span>
                      <span>{detail.etablissement}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Centre:</span>
                      <span>{detail.centre}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Antenne:</span>
                      <span>{detail.antenne}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} className="mr-1" />
                    Modifier
                  </button>
                </div>
              </div>
            )}

            {showEditModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">Modifier Détails de la liste</h2>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block mb-1 font-medium">Année</label>
                      <input
                        type="text"
                        name="annee"
                        value={editFormData.annee}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Trimestre</label>
                      <select
                        name="trimestre"
                        value={editFormData.trimestre}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4">T4</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Fonction</label>
                      <select
                        name="fonction"
                        value={editFormData.fonction}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="CL">CL</option>
                        <option value="CTR">CTR</option>
                        <option value="CRMV">CRMV</option>
                        <option value="CFT">CFT</option>
                        <option value="DVT">DVT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Établissement</label>
                      <select
                        name="etablissement"
                        value={editFormData.etablissement}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="etablissement_1">etablissement_1</option>
                        <option value="etablissement_2">etablissement_2</option>
                        <option value="etablissement_3">etablissement_3</option>
                        <option value="etablissement_4">etablissement_4</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Centre</label>
                      <select
                        name="centre"
                        value={editFormData.centre}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="centre_1">centre_1</option>
                        <option value="centre_2">centre_2</option>
                        <option value="centre_3">centre_3</option>
                        <option value="centre_4">centre_4</option>
                        <option value="centre_7">centre_7</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Antenne</label>
                      <select
                        name="antenne"
                        value={editFormData.antenne}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="antenne_1">antenne_1</option>
                        <option value="antenne_2">antenne_2</option>
                        <option value="antenne_3">antenne_3</option>
                        <option value="antenne_4">antenne_4</option>
                        <option value="antenne_5">antenne_5</option>
                        <option value="antenne_6">antenne_6</option>
                        <option value="antenne_7">antenne_7</option>
                        <option value="antenne_8">antenne_8</option>
                      </select>
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
          </div>

          {/* Procédures */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="border-b">
              <SectionHeader 
                icon={<List size={20} className="text-green-500 ml-6" />}
                title="Procédures (Sécurité de l'exploitation ferroviaire)" 
                section="procedures" 
              />
            </div>
            
            {expandedSections.procedures && (
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N° PR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Désignation PR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Critères de contrôle
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detail.procedures.map((proc) => (
                      <tr key={proc.prNumber} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {proc.prNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {proc.designation}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <ul className="list-disc pl-5 space-y-1">
                            {proc.criteres.map((crit, idx) => (
                              <li key={idx}>{crit}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => navigate('/procedure-management')}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} className="mr-1" />
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Pratique Professionnels Observables en Situation ( SEF/ SST) */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="border-b">
              <SectionHeader 
                icon={<List size={20} className="text-orange-500 ml-6" />}
                title="Pratique Professionnels Observables en Situation ( SEF/ SST)" 
                section="ppos" 
              />
            </div>
            
            {expandedSections.ppos && (
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N° PPOS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type PPOS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Désignation PPOS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Critères de contrôle
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detail.ppos.map((proc) => (
                      <tr key={proc.prNumber} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {proc.prNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {proc.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {proc.designation}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <ul className="list-disc pl-5 space-y-1">
                            {proc.criteres.map((crit, idx) => (
                              <li key={idx}>{crit}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => navigate('/ppos-management')}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} className="mr-1" />
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="border-b">
              <SectionHeader 
                icon={<FileText size={20} className="text-purple-500 ml-6 " />}
                title="Check-list de contrôle des documents" 
                section="documents" 
              />
            </div>
            
            {expandedSections.documents && (
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N°
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Désignation DOC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'application
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Édition DOC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Version
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rectificatifs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Critères de contrôles
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detail.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {doc.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.dateApplication}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.edition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.rectificatifs}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {doc.criteres}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => navigate('/document-checklist-management')}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} className="mr-1" />
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Responsable */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex items-center">
              <Users size={20} className="text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">Responsable</h2>
            </div>
            <p className="mt-2">
              Chef de Service Planification et Sécurité <strong>{detail.responsable}</strong>
            </p>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowResponsableModal(true)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit2 size={18} className="mr-1" />
                Modifier
              </button>
            </div>
          </div>

          {/* Versions de groupe */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="border-b">
              <SectionHeader 
                icon={<Clock size={20} className="text-red-500 ml-6 " />}
                title="Versions " 
                section="versions" 
              />
            </div>
            
            {expandedSections.versions && (
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Version
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'entrée en vigueur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detail.versions.map((ver, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ver.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ver.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ver.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        {showResponsableModal && <ResponsableModal />}
        </main>
      </div>
    </div>
  );
};

export default ControleSurVifDetail;
