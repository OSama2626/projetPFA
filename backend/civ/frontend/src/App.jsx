import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Admin/DashboardPage';
import AdminManagement from './pages/Admin/AdminManagement';
import AdminEtablissementManagement from './pages/Admin/AdminEtablissementManagement';
import InspectorManagement from './pages/Admin/InspectorManagement';
import Kn1Management from './pages/Admin/Kn1Management';
import Kn2Management from './pages/Admin/Kn2Management';
import Kn3Management from './pages/Admin/Kn3Management';
import CollaborateurManagement from './pages/Admin/CollaborateurManagement';
import ControleAPrioriManagement from './pages/Admin/ControleAPrioriManagement';
import ControleAPrioriDetail from './pages/Admin/ControleAPrioriDetail';
import ProcedureManagement from './pages/Admin/ProcedureManagement';
import CriteresManagement from './pages/Admin/CriteresManagement';
import DocumentChecklistManagement from './pages/Admin/DocumentChecklistManagement';
import EtablissementManagement from './pages/Admin/EtablissementManagement';
import CentreManagement from './pages/Admin/CentreManagement';
import AntenneManagement from './pages/Admin/AntenneManagement';
import DepartementManagement from './pages/Admin/DepartementManagement';
import ServiceManagement from './pages/Admin/ServiceManagement';
import EnginMoteurManagement from './pages/Admin/EnginMoteurManagement';
import SiteProductionManagement from './pages/Admin/SiteProductionManagement';
import LigneManagement from './pages/Admin/LigneManagement';
import ControleSurVifManagement from './pages/Admin/ControleSurVifManagement'
import ControleSurVifDetail from './pages/Admin/ControleSurVifDetail'
import PposManagement from './pages/Admin/PposManagement'
import ControleAPrioriAdd from './pages/Admin/ControleAPrioriAdd';
import ControleSurVifAdd from './pages/Admin/ControleSurVifAdd';
import ControleAPosterioriManagement from './pages/Admin/ControleAPosterioriManagement';
import ControleAPosterioriDetail from './pages/Admin/ControleAPosterioriDetail';
import ControleAPosterioriAdd from './pages/Admin/ControleAPosterioriAdd';
import ProfilePage from './pages/Admin/ProfilePage';

import DashboardAdminEtablissement from './pages/AdminEtablissement/DashboardPage';
import KN1ManagementAdminEtablissement from './pages/AdminEtablissement/Kn1Management';
import KN2ManagementAdminEtablissement from './pages/AdminEtablissement/Kn2Management';
import KN3ManagementAdminEtablissement from './pages/AdminEtablissement/Kn3Management';
import CollaborateurManagementAdminEtablissement from './pages/AdminEtablissement/CollaborateurManagement';
import ControleAPrioriManagementAdminEtablissement from './pages/AdminEtablissement/ControleAPrioriManagement';
import ControleAPrioriAddAdminEtablissement from './pages/AdminEtablissement/ControleAPrioriAdd';
import ControleAPrioriDetailAdminEtablissement from './pages/AdminEtablissement/ControleAPrioriDetail';
import ProcedureManagementAdminEtablissement from './pages/AdminEtablissement/ProcedureManagement';
import CriteresManagementAdminEtablissement from './pages/AdminEtablissement/CriteresManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/admin-etablissement-management" element={<AdminEtablissementManagement />} />
        <Route path="/inspecteur-management" element={<InspectorManagement />} />
        <Route path="/kn1-management" element={<Kn1Management />} />
        <Route path="/kn2-management" element={<Kn2Management />} />
        <Route path="/kn3-management" element={<Kn3Management />} />
        <Route path="/collaborateur-management" element={<CollaborateurManagement />} />
        <Route path="/controle-a-priori" element={<ControleAPrioriManagement />} />
        <Route path="/controle-a-priori/:id" element={<ControleAPrioriDetail />} />
        <Route path="/procedure-management" element={<ProcedureManagement />} />
        <Route path="/procedure/:prNumber/criteres" element={<CriteresManagement />} />
        <Route path="/document-checklist-management" element={<DocumentChecklistManagement />} />
        <Route path="/etablissement-management" element={<EtablissementManagement />} />
        <Route path="/centre-management" element={<CentreManagement />} />
        <Route path="/antenne-management" element={<AntenneManagement />} />
        <Route path="/departement-management" element={<DepartementManagement />} />
        <Route path="/service-management" element={<ServiceManagement />} />
        <Route path="/engin-moteur-management" element={<EnginMoteurManagement />} />
        <Route path="/site-production-management" element={<SiteProductionManagement />} />
        <Route path="/ligne-management" element={<LigneManagement />} />
        <Route path="/controle-sur-vif" element={<ControleSurVifManagement/>} />
        <Route path="/controle-sur-vif/:id" element={<ControleSurVifDetail />} />
        <Route path="/ppos-management" element={<PposManagement/>}/>
        <Route path="/controle-a-priori/add" element={<ControleAPrioriAdd/>}/>
        <Route path="/controle-sur-vif/add" element={<ControleSurVifAdd/>}/>
        <Route path="/controle-a-posteriori" element={<ControleAPosterioriManagement/>}/>
        <Route path="/controle-a-posteriori/:id" element={<ControleAPosterioriDetail/>}/>
        <Route path="/controle-a-posteriori/add" element={<ControleAPosterioriAdd/>}/>
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin-etablissement/dashboard" element={<DashboardAdminEtablissement />} />
        <Route path="/admin-etablissement/kn1-management" element={<KN1ManagementAdminEtablissement />} />
        <Route path="/admin-etablissement/kn2-management" element={<KN2ManagementAdminEtablissement />} />
        <Route path="/admin-etablissement/kn3-management" element={<KN3ManagementAdminEtablissement />} />
        <Route path="/admin-etablissement/collaborateur-management" element={<CollaborateurManagementAdminEtablissement />} />
        <Route path="/admin-etablissement/controle-a-priori" element={<ControleAPrioriManagementAdminEtablissement/>}/>
        <Route path="/admin-etablissement/controle-a-priori/add" element={<ControleAPrioriAddAdminEtablissement/>}/>
        <Route path="/admin-etablissement/controle-a-priori/:id" element={<ControleAPrioriDetailAdminEtablissement/>} />
        <Route path="/admin-etablissement/procedure-management" element={<ProcedureManagementAdminEtablissement />} />
        <Route path="/admin-etablissement/procedure/:prNumber/criteres" element={<CriteresManagementAdminEtablissement />} />

      </Routes>
    </Router>
  );
}
export default App;
