package ma.project.civ.services;

import ma.project.civ.dto.ControleAPosterioriDTO;
import ma.project.civ.entities.controles.ControleAPosteriori;
import ma.project.civ.mapper.ControleAPosterioriMapper;
import ma.project.civ.repositories.controles.ControleAPosterioriRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ControleAPosterioriServiceImp implements ControleAPosterioriService {

    private final ControleAPosterioriRepository controleAPosterioriRepository;
    private final ControleAPosterioriMapper controleAPosterioriMapper;

    public ControleAPosterioriServiceImp(ControleAPosterioriRepository controleAPosterioriRepository, ControleAPosterioriMapper controleAPosterioriMapper) {
        this.controleAPosterioriRepository = controleAPosterioriRepository;
        this.controleAPosterioriMapper = controleAPosterioriMapper;
    }

    @Override
    public ControleAPosterioriDTO save(ControleAPosterioriDTO controleAPosterioriDTO) {
        ControleAPosteriori controleAPosteriori = controleAPosterioriMapper.fromControleAPosterioriDTO(controleAPosterioriDTO);
        controleAPosteriori.getProcedures().forEach(procedure -> procedure.setControleAPosteriori(controleAPosteriori));
        ControleAPosteriori savedControle = controleAPosterioriRepository.save(controleAPosteriori);
        return controleAPosterioriMapper.fromControleAPosteriori(savedControle);
    }

    @Override
    public List<ControleAPosterioriDTO> findAll() {
        return controleAPosterioriRepository.findAll().stream()
                .map(controleAPosterioriMapper::fromControleAPosteriori)
                .collect(Collectors.toList());
    }

    @Override
    public List<ControleAPosterioriDTO> findByFilter(int annee, String trimestre, String etablissement, String centre, String antenne) {
        // This is a simple implementation. A more robust solution would use Specifications or QueryDSL.
        return controleAPosterioriRepository.findAll().stream()
                .filter(c -> c.getAnnee() == annee)
                .filter(c -> trimestre == null || c.getTrimestre().equals(trimestre))
                .filter(c -> etablissement == null || c.getEtablissement().equals(etablissement))
                .filter(c -> centre == null || c.getCentre().equals(centre))
                .filter(c -> antenne == null || c.getAntenne().equals(antenne))
                .map(controleAPosterioriMapper::fromControleAPosteriori)
                .collect(Collectors.toList());
    }
}
