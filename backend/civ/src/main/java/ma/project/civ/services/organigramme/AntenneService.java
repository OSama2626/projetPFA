package ma.project.civ.services.organigramme;

import ma.project.civ.dto.AntenneDTO;
import ma.project.civ.entities.organigramme.Antenne;

import java.util.List;
import java.util.Optional;

public interface AntenneService {
    List<AntenneDTO> getAllAntennes();
    Optional<Antenne> findById(Long id);
    Antenne save(Antenne antenne);
}
