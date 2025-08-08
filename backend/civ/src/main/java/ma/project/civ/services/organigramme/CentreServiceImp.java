package ma.project.civ.services.organigramme;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.CentreDTO;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.mapper.CentreMapper;
import ma.project.civ.repositories.organigramme.CentreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CentreServiceImp implements CentreService {

    private final CentreRepository centreRepository;
    private final CentreMapper centreMapper;

    @Override
    public List<CentreDTO> getAllCentres() {
        return centreRepository.findAll()
                .stream()
                .map(centreMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Centre> findById(Long id) {
        return centreRepository.findById(id);
    }

    @Override
    public Centre save(Centre centre) {
        return centreRepository.save(centre);
    }
}
