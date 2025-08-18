package ma.project.civ.services.materiel;

import lombok.RequiredArgsConstructor;
import ma.project.civ.dto.materiel.LigneDTO;
import ma.project.civ.entities.materiel.Ligne;
import ma.project.civ.mapper.materiel.LigneMapper;
import ma.project.civ.repositories.materiel.LigneRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LigneServiceImp implements LigneService {

    private final LigneRepository ligneRepository;
    private final LigneMapper ligneMapper;

    @Override
    public List<LigneDTO> findAll() {
        return ligneRepository.findAll()
                .stream()
                .map(ligneMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public LigneDTO findById(Long id) {
        Ligne ligne = ligneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ligne not found"));
        return ligneMapper.toDto(ligne);
    }

    @Override
    public LigneDTO save(LigneDTO ligneDTO) {
        Ligne ligne = ligneMapper.toEntity(ligneDTO);
        Ligne savedLigne = ligneRepository.save(ligne);
        return ligneMapper.toDto(savedLigne);
    }

    @Override
    public LigneDTO update(Long id, LigneDTO ligneDTO) {
        Ligne existingLigne = ligneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ligne not found"));
        existingLigne.setOrigine(ligneDTO.getOrigine());
        existingLigne.setDestination(ligneDTO.getDestination());
        existingLigne.setDistance(ligneDTO.getDistance());
        Ligne updatedLigne = ligneRepository.save(existingLigne);
        return ligneMapper.toDto(updatedLigne);
    }

    @Override
    public void deleteById(Long id) {
        ligneRepository.deleteById(id);
    }
}
