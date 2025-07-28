package ma.project.civ.repositories.controles;

import ma.project.civ.entities.controles.ControleAPosteriori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControleAPosterioriRepository extends JpaRepository<ControleAPosteriori, Long> {
}
