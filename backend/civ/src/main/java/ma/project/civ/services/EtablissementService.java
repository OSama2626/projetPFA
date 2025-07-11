package ma.project.civ.services;

import ma.project.civ.entities.organigramme.Etablissement;

import java.util.List;
import java.util.UUID;

public interface EtablissementService {
    public List<Etablissement> getAllEtablissement();
    public Etablissement getEtablissementById(UUID id);
    public Etablissement createEtablissement(Etablissement etablissement);
}
