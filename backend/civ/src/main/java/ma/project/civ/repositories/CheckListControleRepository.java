package ma.project.civ.repositories;

import ma.project.civ.entities.CheckListControle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListControleRepository extends JpaRepository<CheckListControle, Long> {
}
