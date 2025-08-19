import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import { Plus, Trash2 } from 'lucide-react';

const ControleAPrioriAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    annee: '',
    trimestre: '',
    fonction: '',
    centre: '',
    antenne: '',
    responsable: '',
    procedures: [
    ],
    documents: [],
  });

  const trimestreOptions = ['T1', 'T2', 'T3', 'T4'];
  const fonctionOptions = ['CL', 'CTR', 'CRMV', 'CFT', 'DVT'];
  const centreOptions = ['centre_1', 'centre_2', 'centre_3', 'centre_4', 'centre_7'];
  const antenneOptions = ['antenne_1', 'antenne_2', 'antenne_5', 'antenne_7', 'antenne_8'];
  const responsableOptions = ['responsable KN1', 'responsable KN2', 'responsable KN3', 'responsable KN4'];

  // Handlers for main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Procedures handlers
  const addProcedure = () => {
    setFormData(prev => ({
      ...prev,
      procedures: [...prev.procedures, { prNumber: prev.procedures.length + 1, designation: '', criteres: [{ reponse: '', coefficient: '1' }] }]
    }));
  };

  const removeProcedure = (index) => {
    setFormData(prev => {
      const newProcedures = prev.procedures.filter((_, i) => i !== index);
      return { ...prev, procedures: newProcedures };
    });
  };

  const handleProcedureChange = (index, field, value) => {
    setFormData(prev => {
      const newProcedures = [...prev.procedures];
      newProcedures[index][field] = value;
      return { ...prev, procedures: newProcedures };
    });
  };

  const addProcedureCritere = (procIndex) => {
    setFormData(prev => {
      const newProcedures = [...prev.procedures];
      // Fix: add only one critere object
      // Prevent duplicate addition by checking if last critere is empty
      const lastCritere = newProcedures[procIndex].criteres[newProcedures[procIndex].criteres.length - 1];
      if (!lastCritere || (lastCritere.reponse !== '')) {
        newProcedures[procIndex].criteres = [...newProcedures[procIndex].criteres, { reponse: '', coefficient: '1' }];
      }
      return { ...prev, procedures: newProcedures };
    });
  };

  const removeProcedureCritere = (procIndex, critIndex) => {
    setFormData(prev => {
      const newProcedures = [...prev.procedures];
      newProcedures[procIndex].criteres = newProcedures[procIndex].criteres.filter((_, i) => i !== critIndex);
      return { ...prev, procedures: newProcedures };
    });
  };

  const handleProcedureCritereChange = (procIndex, critIndex, field, value) => {
    setFormData(prev => {
      const newProcedures = [...prev.procedures];
      newProcedures[procIndex].criteres[critIndex][field] = value;
      return { ...prev, procedures: newProcedures };
    });
  };

  // Documents handlers
  const addDocument = () => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, { id: prev.documents.length + 1, designation: '', dateApplication: '', edition: '', version: '', rectificatifs: '', criteres: '' }]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => {
      const newDocuments = prev.documents.filter((_, i) => i !== index);
      return { ...prev, documents: newDocuments };
    });
  };

  const handleDocumentChange = (index, field, value) => {
    setFormData(prev => {
      const newDocuments = [...prev.documents];
      newDocuments[index][field] = value;
      return { ...prev, documents: newDocuments };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Nouveau contrôle à priori ajouté : ' + JSON.stringify(formData, null, 2));
    console.log('Nouveau contrôle à priori ajouté : ' + JSON.stringify(formData, null, 2));
    navigate('/admin-etablissement/controle-a-priori');
  };

  const handleCancel = () => {
    navigate('/admin-etablissement/controle-a-priori');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar page={"Nouveau PR/DOC du controle à priri "}/>
        <main className="p-6 flex-grow overflow-auto max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Ajouter un nouveau contrôle à priori</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-8">
            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 font-medium">Année</label>
                <input
                  type="number"
                  name="annee"
                  value={formData.annee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                  min={2000}
                  max={2100}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Trimestre</label>
                <select
                  name="trimestre"
                  value={formData.trimestre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez un trimestre</option>
                  {trimestreOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Fonction</label>
                <select
                  name="fonction"
                  value={formData.fonction}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez une fonction</option>
                  {fonctionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Centre</label>
                <select
                  name="centre"
                  value={formData.centre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez un centre</option>
                  {centreOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Antenne</label>
                <select
                  name="antenne"
                  value={formData.antenne}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez une antenne</option>
                  {antenneOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Responsable */}
            <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
              <label className="block mb-1 font-medium">Responsable</label>
              <select
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring-yellow-500 focus:border-yellow-500"
                required
              >
                <option value="">Sélectionnez un responsable</option>
                {responsableOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Procedures */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Procédures (Sécurité de l'exploitation ferroviaire)</h2>
              {formData.procedures.map((proc, procIndex) => (
                <div key={procIndex} className="mb-6 p-4 border rounded relative bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => removeProcedure(procIndex)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    title="Supprimer procédure"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 font-medium">N° PR</label>
                      <input
                        type="number"
                        value={proc.prNumber}
                        onChange={(e) => handleProcedureChange(procIndex, 'prNumber', parseInt(e.target.value) || '')}
                        className="w-full px-3 py-2 border rounded"
                        min={1}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 font-medium">Désignation PR</label>
                      <input
                        type="text"
                        value={proc.designation}
                        onChange={(e) => handleProcedureChange(procIndex, 'designation', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block mb-1 font-medium">Critères de contrôle</label>
                    {proc.criteres.map((crit, critIndex) => (
                      <div key={critIndex} className="flex items-center mb-2 gap-2">
                        <input
                          type="text"
                          value={crit.reponse}
                          onChange={(e) => handleProcedureCritereChange(procIndex, critIndex, 'reponse', e.target.value)}
                          className="flex-grow px-3 py-2 border rounded"
                          required
                        />
                        <input
                          type="number"
                          value={crit.coeficient || 1}
                          onChange={(e) => handleProcedureCritereChange(procIndex, critIndex, 'coeficient', e.target.value)}
                          className="w-20 px-3 py-2 border rounded"
                          min={1}
                          required
                          title="Coefficient"
                        />
                        <button
                          type="button"
                          onClick={() => removeProcedureCritere(procIndex, critIndex)}
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer critère"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addProcedureCritere(procIndex)}
                      className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Ajouter un critère
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProcedure}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ajouter une procédure
              </button>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Check-list de contrôle des documents</h2>
              {formData.documents.map((doc, docIndex) => (
                <div key={docIndex} className="mb-6 p-4 border rounded relative bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => removeDocument(docIndex)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    title="Supprimer document"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 font-medium">Désignation DOC</label>
                      <input
                        type="text"
                        value={doc.designation}
                        onChange={(e) => handleDocumentChange(docIndex, 'designation', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Date d'application</label>
                      <input
                        type="date"
                        value={doc.dateApplication}
                        onChange={(e) => handleDocumentChange(docIndex, 'dateApplication', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Édition DOC</label>
                      <input
                        type="date"
                        value={doc.edition}
                        onChange={(e) => handleDocumentChange(docIndex, 'edition', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Version</label>
                      <input
                        type="number"
                        value={doc.version}
                        onChange={(e) => handleDocumentChange(docIndex, 'version', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                        min={1}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Rectificatifs</label>
                      <input
                        type="number"
                        value={doc.rectificatifs}
                        onChange={(e) => handleDocumentChange(docIndex, 'rectificatifs', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                        min={0}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block mb-1 font-medium">Critères de contrôles</label>
                      <input
                        type="text"
                        value={doc.criteres}
                        onChange={(e) => handleDocumentChange(docIndex, 'criteres', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addDocument}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ajouter un document
              </button>
            </div>

            {/* Submit and Cancel */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ControleAPrioriAdd;
