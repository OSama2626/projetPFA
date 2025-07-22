package ma.project.civ.repositories.engin_moteur;

import ma.project.civ.entities.engin_moteur.EnginMoteurHabilitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EnginMoteurHabilitationRepository extends JpaRepository<EnginMoteurHabilitation, Long> {

}
