package ma.project.civ.services;

import ma.project.civ.dto.ControleAPosterioriDTO;

import java.util.List;

public interface ControleAPosterioriService {
    ControleAPosterioriDTO save(ControleAPosterioriDTO controleAPosterioriDTO);
    List<ControleAPosterioriDTO> findAll();
    List<ControleAPosterioriDTO> findByFilter(int annee, String trimestre, String etablissement, String centre, String antenne);
}
