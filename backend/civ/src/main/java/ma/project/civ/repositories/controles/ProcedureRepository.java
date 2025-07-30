package ma.project.civ.repositories.controles;

import ma.project.civ.entities.controles.ControlProcedure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcedureRepository extends JpaRepository<ControlProcedure, Long> {
}
