package ma.project.civ.repositories;

import ma.project.civ.entities.ControleAPriori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("aPrioriProcedureRepository")
public interface ControleAPrioriRepository extends JpaRepository<ControleAPriori, Long> {

    @Query("SELECT c FROM ControleAPriori c LEFT JOIN FETCH c.procedures LEFT JOIN FETCH c.checkListControle")
    List<ControleAPriori> findAllWithDetails();
}