package ma.project.civ.repositories.survif;

import ma.project.civ.entities.survif.PPOSSurVif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PPOSSurVifRepository extends JpaRepository<PPOSSurVif, Long> {
}
