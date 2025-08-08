package ma.project.civ.services;

import ma.project.civ.entities.organigramme.Etablissement;

import ma.project.civ.dto.EtablissementDTO;
import ma.project.civ.entities.organigramme.Etablissement;

import java.util.List;
import java.util.Optional;

public interface EtablissementService {
    List<EtablissementDTO> getAllEtablissements();
    Optional<Etablissement> findById(Long id);
    Etablissement save(Etablissement etablissement);
}
