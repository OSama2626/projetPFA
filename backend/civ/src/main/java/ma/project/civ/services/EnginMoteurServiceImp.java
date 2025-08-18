package ma.project.civ.services;

import lombok.RequiredArgsConstructor;
import ma.project.civ.dto.EnginMoteurDTO;
import ma.project.civ.entities.engin_moteur.EnginMoteurHabilitation;
import ma.project.civ.mapper.EnginMoteurMapper;
import ma.project.civ.repositories.engin_moteur.EnginMoteurHabilitationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnginMoteurServiceImp implements EnginMoteurService {

    private final EnginMoteurHabilitationRepository enginMoteurRepository;
    private final EnginMoteurMapper enginMoteurMapper;

    @Override
    public List<EnginMoteurDTO> findAll() {
        return enginMoteurRepository.findAll()
                .stream()
                .map(enginMoteurMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public EnginMoteurDTO findById(Long id) {
        EnginMoteurHabilitation enginMoteur = enginMoteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EnginMoteur not found"));
        return enginMoteurMapper.toDto(enginMoteur);
    }

    @Override
    public EnginMoteurDTO save(EnginMoteurDTO enginMoteurDTO) {
        EnginMoteurHabilitation enginMoteur = enginMoteurMapper.toEntity(enginMoteurDTO);
        EnginMoteurHabilitation savedEnginMoteur = enginMoteurRepository.save(enginMoteur);
        return enginMoteurMapper.toDto(savedEnginMoteur);
    }

    @Override
    public EnginMoteurDTO update(Long id, EnginMoteurDTO enginMoteurDTO) {
        EnginMoteurHabilitation existingEnginMoteur = enginMoteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EnginMoteur not found"));

        existingEnginMoteur.setSerie(enginMoteurDTO.getSerie());
        existingEnginMoteur.setNumero(enginMoteurDTO.getNumero());

        EnginMoteurHabilitation updatedEnginMoteur = enginMoteurRepository.save(existingEnginMoteur);
        return enginMoteurMapper.toDto(updatedEnginMoteur);
    }

    @Override
    public void deleteById(Long id) {
        enginMoteurRepository.deleteById(id);
    }
}
