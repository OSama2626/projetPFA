package ma.project.civ.repositories;

import ma.project.civ.entities.Procedure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("controleProcedureRepository")
public interface ProcedureRepository extends JpaRepository<Procedure, Long> {
}
