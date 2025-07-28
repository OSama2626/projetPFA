package ma.project.civ.services;

import ma.project.civ.entities.ControleSurVif;
import ma.project.civ.repositories.ControleSurVifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ControleSurVifServiceImpl implements ControleSurVifService {

    @Autowired
    private ControleSurVifRepository controleSurVifRepository;

    @Override
    public ControleSurVif save(ControleSurVif controleSurVif) {
        return controleSurVifRepository.save(controleSurVif);
    }

    @Override
    public List<ControleSurVif> findAll() {
        return controleSurVifRepository.findAll();
    }

    @Override
    public List<ControleSurVif> findByFilter(int annee, String trimestre, String etablissement, String centre, String antenne) {
        return controleSurVifRepository.findAll().stream()
                .filter(c -> c.getAnnee() == annee)
                .filter(c -> c.getTrimestre().equals(trimestre))
                .filter(c -> c.getEtablissement().equals(etablissement))
                .filter(c -> c.getCentre().equals(centre))
                .filter(c -> c.getAntenne().equals(antenne))
                .collect(Collectors.toList());
    }
}
