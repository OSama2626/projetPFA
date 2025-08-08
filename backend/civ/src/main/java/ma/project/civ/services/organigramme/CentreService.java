package ma.project.civ.services.organigramme;

import ma.project.civ.dto.CentreDTO;
import ma.project.civ.entities.organigramme.Centre;

import java.util.List;
import java.util.Optional;

public interface CentreService {
    List<CentreDTO> getAllCentres();
    Optional<Centre> findById(Long id);
    Centre save(Centre centre);
}