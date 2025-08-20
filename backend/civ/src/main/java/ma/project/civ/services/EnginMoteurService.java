package ma.project.civ.services;

import ma.project.civ.dto.EnginMoteurDTO;

import java.util.List;

public interface EnginMoteurService {
    List<EnginMoteurDTO> findAll();
    EnginMoteurDTO findById(Long id);
    EnginMoteurDTO save(EnginMoteurDTO enginMoteurDTO);
    EnginMoteurDTO update(Long id, EnginMoteurDTO enginMoteurDTO);
    void deleteById(Long id);
}
