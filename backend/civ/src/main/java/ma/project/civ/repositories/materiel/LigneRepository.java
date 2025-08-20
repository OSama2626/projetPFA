package ma.project.civ.repositories.materiel;

import ma.project.civ.entities.materiel.Ligne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneRepository extends JpaRepository<Ligne, Long> {
}
