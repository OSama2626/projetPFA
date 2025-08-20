package ma.project.civ.repositories.materiel;

import ma.project.civ.entities.materiel.EnginMoteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnginMoteurRepository extends JpaRepository<EnginMoteur, Long> {
}
