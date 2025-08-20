package ma.project.civ.repositories.materiel;

import ma.project.civ.entities.materiel.SiteProduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteProductionRepository extends JpaRepository<SiteProduction, Long> {
}
