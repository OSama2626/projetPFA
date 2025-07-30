package ma.project.civ.repositories;

import ma.project.civ.entities.ControleAPriori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("aPrioriProcedureRepository")
public interface ControleAPrioriRepository extends JpaRepository<ControleAPriori, Long> {
}
