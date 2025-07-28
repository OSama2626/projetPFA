package ma.project.civ.services;

import ma.project.civ.entities.ControleAPriori;

import java.util.List;

public interface ControleAPrioriService {
    ControleAPriori save(ControleAPriori controleAPriori);
    List<ControleAPriori> findAll();
    List<ControleAPriori> findByFilter(int annee, String trimestre, String etablissement, String centre, String antenne);
}
