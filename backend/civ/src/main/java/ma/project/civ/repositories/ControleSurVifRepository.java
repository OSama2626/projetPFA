package ma.project.civ.repositories;

import ma.project.civ.entities.ControleSurVif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControleSurVifRepository extends JpaRepository<ControleSurVif, Long> {
}
