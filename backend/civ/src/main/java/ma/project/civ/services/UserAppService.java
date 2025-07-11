package ma.project.civ.services;

import ma.project.civ.dto.AdminDTO;
import ma.project.civ.dto.AdminEtablissementDTO;
import ma.project.civ.entities.users.*;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserAppService {
     Optional<UserApp> getUserByMatricule(String matricule);



     Admin createAdmin(Admin admin);
     Optional<Admin> getAdminById(UUID id);
     Admin updateAdmin(UUID id,Admin admin);
     Admin deleteAdmin(UUID id);
     Page<AdminDTO> getAdmins(String matricule, String nom, String prenom, String fonction, int page, int size);

     AdminEtablissement createAdminEta(AdminEtablissement adminEta);
     AdminEtablissement updateAdminEta(UUID id,AdminEtablissement adminEta);
     AdminEtablissement deleteAdminEta(UUID id);
     Page<AdminEtablissementDTO> getAdminsEtablissement(String matricule, String nom, String prenom, String fonction, int page, int size);
     Optional<AdminEtablissement>getAdminEtablissementById(UUID id);

    public Inspection createInspection(Inspection inspection);
    public Inspection updateInspection(Inspection inspection);
    public void deleteInspection(Inspection inspection);
    public List<Inspection> getAllInspections(Inspection inspection);


    public KN1 createKn1(KN1 kn1);
    public KN1 updateKn1(KN1 kn1);
    public void deleteKn1(KN1 kn1);
    public List<KN1> getAllKn1(KN1 kn1);

    public KN2 createKn2(KN2 kn2);
    public KN2 updateKn2(KN2 kn2);
    public void deleteKn2(KN2 kn2);
    public List<KN2> getAllKn2(KN2 kn2);

    public KN3 createKn3(KN3 kn3);
    public KN3 updateKn3(KN3 kn3);
    public void deleteKn3(KN3 kn3);
    public List<KN3> getAllKn3(KN3 kn3);
}
