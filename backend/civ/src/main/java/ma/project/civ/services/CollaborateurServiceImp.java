package ma.project.civ.services;

import lombok.AllArgsConstructor;
import ma.project.civ.entities.collaborateurs.Collaborateur;
import ma.project.civ.repositories.CollaborateurRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CollaborateurServiceImp implements CollaborateurService {

    private final CollaborateurRepository collaborateurRepository;

    @Override
    public Collaborateur createCollaborateur(Collaborateur collaborateur) {
        return collaborateurRepository.save(collaborateur);
    }
}
