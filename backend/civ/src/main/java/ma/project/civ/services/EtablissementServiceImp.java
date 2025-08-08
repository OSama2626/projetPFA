package ma.project.civ.services;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.EtablissementDTO;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.mapper.EtablissementMapper;
import ma.project.civ.repositories.organigramme.EtablissementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EtablissementServiceImp implements EtablissementService {

    private final EtablissementRepository etablissementRepository;
    private final EtablissementMapper etablissementMapper;

    @Override
    public List<EtablissementDTO> getAllEtablissements() {
        return etablissementRepository.findAll()
                .stream()
                .map(etablissementMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Etablissement> findById(Long id) {
        return etablissementRepository.findById(id);
    }

    @Override
    public Etablissement save(Etablissement etablissement) {
        return etablissementRepository.save(etablissement);
    }
}
