package ma.project.civ.services;

import lombok.AllArgsConstructor;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.repositories.organigramme.EtablissementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class EtablissementServiceImp implements EtablissementService {

   private final EtablissementRepository etablissementRepository;

    @Override
    public List<Etablissement> getAllEtablissement() {
        return etablissementRepository.findAll();
    }

    @Override
    public Etablissement getEtablissementById(UUID id) {
        return null;
    }

    @Override
    public Etablissement createEtablissement(Etablissement etablissement) {
        return null;
    }
}
