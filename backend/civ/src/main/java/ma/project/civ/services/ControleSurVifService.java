package ma.project.civ.services;

import ma.project.civ.entities.ControleSurVif;

import java.util.List;

public interface ControleSurVifService {
    ControleSurVif save(ControleSurVif controleSurVif);
    List<ControleSurVif> findAll();
    List<ControleSurVif> findByFilter(int annee, String trimestre, String etablissement, String centre, String antenne);
}
