package ma.project.civ.services.organigramme;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.AntenneDTO;
import ma.project.civ.entities.organigramme.Antenne;
import ma.project.civ.mapper.AntenneMapper;
import ma.project.civ.repositories.organigramme.AntenneRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AntenneServiceImp implements AntenneService {

    private final AntenneRepository antenneRepository;
    private final AntenneMapper antenneMapper;

    @Override
    public List<AntenneDTO> getAllAntennes() {
        return antenneRepository.findAll()
                .stream()
                .map(antenneMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Antenne> findById(Long id) {
        return antenneRepository.findById(id);
    }

    @Override
    public Antenne save(Antenne antenne) {
        return antenneRepository.save(antenne);
    }
}
