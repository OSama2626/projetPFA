package ma.project.civ.services;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.AdminDTO;
import ma.project.civ.dto.AdminEtablissementDTO;
import ma.project.civ.entities.users.*;
import ma.project.civ.mapper.AdminEtablissementMapper;
import ma.project.civ.mapper.AdminMapper;
import ma.project.civ.repositories.users.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserAppServiceImp implements UserAppService {

    private final UserAppRepository userAppRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminEtablissementRepository adminEtablissementRepository;
    private final InspectionRepository inspectionRepository;
    private final KN1Repository kn1Repository;
    private final KN2Repository kn2Repository;
    private final KN3Repository kn3Repository;
    @Override
    public Optional<UserApp> getUserByMatricule(String matricule) {
        return userAppRepository.findByMatricule(matricule);
    }

    @Override
    public Admin createAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> getAdminById(UUID id) {
        return adminRepository.findById(id);
    }

    @Override
    public Admin updateAdmin(UUID id ,Admin admin) {
        Admin adminToUpdate = adminRepository.findById(id).orElse(null);
        assert adminToUpdate != null;
        adminToUpdate.setNom(admin.getNom());
        adminToUpdate.setPrenom(admin.getPrenom());
        adminToUpdate.setMatricule(admin.getMatricule());
        adminToUpdate.setEmail(admin.getEmail());
        adminToUpdate.setFonction(admin.getFonction());
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            adminToUpdate.setPassword(passwordEncoder.encode(admin.getPassword()));
        }
        return adminRepository.save(adminToUpdate);
    }

    @Override
    public Admin deleteAdmin(UUID id) {
        Admin adminToDelete = adminRepository.findById(id).orElse(null);
        assert adminToDelete != null;
        adminRepository.delete(adminToDelete);
        return adminToDelete;
    }


    @Override
    public Page<AdminDTO> getAdmins(String matricule, String nom, String prenom, String fonction, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Admin> adminPage = adminRepository.searchAdmins(matricule, nom, prenom, fonction, pageable);
        return adminPage.map(AdminMapper::toDto);
    }


    @Override
    public AdminEtablissement createAdminEta(AdminEtablissement adminEta) {
        adminEta.setPassword(passwordEncoder.encode(adminEta.getPassword()));
        return adminEtablissementRepository.save(adminEta);
    }

    @Override
    public AdminEtablissement updateAdminEta(UUID id,AdminEtablissement adminEta) {
        AdminEtablissement adminEtaToUpdate = adminEtablissementRepository.findById(id).orElse(null);
        assert adminEtaToUpdate != null;
        adminEtaToUpdate.setNom(adminEta.getNom());
        adminEtaToUpdate.setPrenom(adminEta.getPrenom());
        adminEtaToUpdate.setMatricule(adminEta.getMatricule());
        adminEtaToUpdate.setEmail(adminEta.getEmail());
        adminEtaToUpdate.setFonction(adminEta.getFonction());
        adminEtaToUpdate.setEtablissement(adminEta.getEtablissement());
        if (adminEta.getPassword() != null && !adminEta.getPassword().isEmpty()) {
            adminEtaToUpdate.setPassword(passwordEncoder.encode(adminEta.getPassword()));
        }
        return adminEtablissementRepository.save(adminEtaToUpdate);
    }

    @Override
    public AdminEtablissement deleteAdminEta(UUID id) {
        AdminEtablissement adminToDelete = adminEtablissementRepository.findById(id).orElse(null);
        assert adminToDelete != null;
        adminEtablissementRepository.delete(adminToDelete);
        return adminToDelete;
    }

    @Override
    public Page<AdminEtablissementDTO> getAdminsEtablissement(String matricule, String nom, String prenom, String fonction, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AdminEtablissement> adminPage = adminEtablissementRepository.searchAdmins(matricule, nom, prenom, fonction, pageable);
        return adminPage.map(AdminEtablissementMapper::toDto);
    }


//    @Override
//    public Page<AdminEtablissement> getAdminsEtablissement(String matricule, String nom, String prenom, String fonction, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return adminEtablissementRepository.searchAdmins(matricule, nom, prenom, fonction, pageable);
//    }

    @Override
    public Optional<AdminEtablissement> getAdminEtablissementById(UUID id) {
        return adminEtablissementRepository.findById(id);
    }
    @Override
    public Inspection createInspection(Inspection inspection) {
        inspection.setPassword(passwordEncoder.encode(inspection.getPassword()));
        return inspectionRepository.save(inspection);
    }
    @Override
    public Inspection updateInspection(Inspection inspection) {
        Inspection inspectionToUpdate = inspectionRepository.findById(inspection.getId()).orElse(null);
        assert inspectionToUpdate != null;
        inspectionToUpdate.setNom(inspection.getNom());
        inspectionToUpdate.setPrenom(inspection.getPrenom());
        inspectionToUpdate.setMatricule(inspection.getMatricule());
        inspectionToUpdate.setEmail(inspection.getEmail());
        inspectionToUpdate.setFonction(inspection.getFonction());
        inspectionToUpdate.setDepartement(inspection.getDepartement());
        inspectionToUpdate.setService(inspection.getService());
        if (inspection.getPassword() != null && !inspection.getPassword().isEmpty()) {
            inspectionToUpdate.setPassword(passwordEncoder.encode(inspection.getPassword()));
        }
        return inspectionRepository.save(inspectionToUpdate);
    }

    @Override
    public void deleteInspection(Inspection inspection) {
        inspectionRepository.delete(inspection);
    }

    @Override
    public List<Inspection> getAllInspections(Inspection inspection) {
        return inspectionRepository.findAll();
    }

    @Override
    public KN1 createKn1(KN1 kn1) {
        kn1.setPassword(passwordEncoder.encode(kn1.getPassword()));
        return kn1Repository.save(kn1);
    }

    @Override
    public KN1 updateKn1(KN1 kn1) {
        KN1 kn1ToUpdate = kn1Repository.findById(kn1.getId()).orElse(null);
        assert kn1ToUpdate != null;
        kn1ToUpdate.setNom(kn1.getNom());
        kn1ToUpdate.setPrenom(kn1.getPrenom());
        kn1ToUpdate.setMatricule(kn1.getMatricule());
        kn1ToUpdate.setEmail(kn1.getEmail());
        kn1ToUpdate.setFonction(kn1.getFonction());
        kn1ToUpdate.setAntenne(kn1.getAntenne());
        kn1ToUpdate.setCentre(kn1.getCentre());
        kn1ToUpdate.setService(kn1.getService());
        kn1ToUpdate.setEtablissement(kn1.getEtablissement());
        if (kn1.getPassword() != null && !kn1.getPassword().isEmpty()) {
            kn1ToUpdate.setPassword(passwordEncoder.encode(kn1.getPassword()));
        }
        return kn1Repository.save(kn1ToUpdate);
    }

    @Override
    public void deleteKn1(KN1 kn1) {
        kn1Repository.delete(kn1);
    }

    @Override
    public List<KN1> getAllKn1(KN1 kn1) {
        return kn1Repository.findAll();
    }

    @Override
    public KN2 createKn2(KN2 kn2) {
        kn2.setPassword(passwordEncoder.encode(kn2.getPassword()));
        return kn2Repository.save(kn2);
    }

    @Override
    public KN2 updateKn2(KN2 kn2) {
        KN2 kn2ToUpdate = kn2Repository.findById(kn2.getId()).orElse(null);
        assert kn2ToUpdate != null;
        kn2ToUpdate.setNom(kn2.getNom());
        kn2ToUpdate.setPrenom(kn2.getPrenom());
        kn2ToUpdate.setMatricule(kn2.getMatricule());
        kn2ToUpdate.setEmail(kn2.getEmail());
        kn2ToUpdate.setFonction(kn2.getFonction());
        kn2ToUpdate.setCentre(kn2.getCentre());
        kn2ToUpdate.setEtablissement(kn2.getEtablissement());
        if (kn2.getPassword() != null && !kn2.getPassword().isEmpty()) {
            kn2ToUpdate.setPassword(passwordEncoder.encode(kn2.getPassword()));
        }
        return kn2Repository.save(kn2ToUpdate);
    }

    @Override
    public void deleteKn2(KN2 kn2) {
        kn2Repository.delete(kn2);
    }

    @Override
    public List<KN2> getAllKn2(KN2 kn2) {
        return kn2Repository.findAll();
    }

    @Override
    public KN3 createKn3(KN3 kn3) {
        kn3.setPassword(passwordEncoder.encode(kn3.getPassword()));
        return kn3Repository.save(kn3);
    }

    @Override
    public KN3 updateKn3(KN3 kn3) {
        KN3 kn3ToUpdate = kn3Repository.findById(kn3.getId()).orElse(null);
        assert kn3ToUpdate != null;
        kn3ToUpdate.setNom(kn3.getNom());
        kn3ToUpdate.setPrenom(kn3.getPrenom());
        kn3ToUpdate.setMatricule(kn3.getMatricule());
        kn3ToUpdate.setEmail(kn3.getEmail());
        kn3ToUpdate.setFonction(kn3.getFonction());
        kn3ToUpdate.setEtablissement(kn3.getEtablissement());
        if (kn3.getPassword() != null && !kn3.getPassword().isEmpty()) {
            kn3ToUpdate.setPassword(passwordEncoder.encode(kn3.getPassword()));
        }
        return kn3Repository.save(kn3ToUpdate);
    }

    @Override
    public void deleteKn3(KN3 kn3) {
        kn3Repository.delete(kn3);
    }

    @Override
    public List<KN3> getAllKn3(KN3 kn3) {
        return kn3Repository.findAll();
    }
}
