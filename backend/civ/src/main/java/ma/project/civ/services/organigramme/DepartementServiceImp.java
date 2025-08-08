package ma.project.civ.services.organigramme;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.DepartementDTO;
import ma.project.civ.entities.organigramme.Departement;
import ma.project.civ.mapper.DepartementMapper;
import ma.project.civ.repositories.organigramme.DepartementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartementServiceImp implements DepartementService {

    private final DepartementRepository departementRepository;
    private final DepartementMapper departementMapper;

    @Override
    public List<DepartementDTO> getAllDepartements() {
        return departementRepository.findAll()
                .stream()
                .map(departementMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Departement> findById(Long id) {
        return departementRepository.findById(id);
    }

    @Override
    public Departement save(Departement departement) {
        return departementRepository.save(departement);
    }
}
