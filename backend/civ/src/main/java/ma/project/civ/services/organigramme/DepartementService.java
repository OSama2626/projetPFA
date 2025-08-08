package ma.project.civ.services.organigramme;

import ma.project.civ.dto.DepartementDTO;
import ma.project.civ.entities.organigramme.Departement;

import java.util.List;
import java.util.Optional;

public interface DepartementService {
    List<DepartementDTO> getAllDepartements();
    Optional<Departement> findById(Long id);
    Departement save(Departement departement);
}
