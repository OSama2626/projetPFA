package ma.project.civ.repositories.collaborateurs;

import ma.project.civ.entities.collaborateurs.Collaborateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CollaborateurRepository extends JpaRepository<Collaborateur, UUID> {
}
