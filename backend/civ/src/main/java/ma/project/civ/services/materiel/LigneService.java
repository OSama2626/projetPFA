package ma.project.civ.services.materiel;

import ma.project.civ.dto.materiel.LigneDTO;

import java.util.List;

public interface LigneService {
    List<LigneDTO> findAll();
    LigneDTO findById(Long id);
    LigneDTO save(LigneDTO ligneDTO);
    LigneDTO update(Long id, LigneDTO ligneDTO);
    void deleteById(Long id);
}
