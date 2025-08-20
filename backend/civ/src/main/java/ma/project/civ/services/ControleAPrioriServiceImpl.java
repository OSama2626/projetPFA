package ma.project.civ.services;

import ma.project.civ.entities.ControleAPriori;
import ma.project.civ.repositories.ControleAPrioriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ControleAPrioriServiceImpl implements ControleAPrioriService {

    @Autowired
    private ControleAPrioriRepository controleAPrioriRepository;

    @Override
    @Transactional
    public ControleAPriori save(ControleAPriori controleAPriori) {
        if (controleAPriori.getProcedures() != null) {
            controleAPriori.getProcedures().forEach(procedure -> procedure.setControleAPriori(controleAPriori));
        }
        if (controleAPriori.getCheckListControle() != null) {
            controleAPriori.getCheckListControle().setControleAPriori(controleAPriori);
        }
        return controleAPrioriRepository.save(controleAPriori);
    }

    @Override
    public List<ControleAPriori> findAll() {
        return controleAPrioriRepository.findAllWithDetails();
    }

    @Override
    public List<ControleAPriori> findByFilter(int annee, String trimestre, String etablissement, String centre, String antenne) {
        return controleAPrioriRepository.findAll().stream()
                .filter(c -> c.getAnnee() == annee)
                .filter(c -> c.getTrimestre().equals(trimestre))
                .filter(c -> c.getEtablissement().equals(etablissement))
                .filter(c -> c.getCentre().equals(centre))
                .filter(c -> c.getAntenne().equals(antenne))
                .collect(Collectors.toList());
    }
}