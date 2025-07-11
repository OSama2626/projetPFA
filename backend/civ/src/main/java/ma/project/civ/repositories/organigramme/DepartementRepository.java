package ma.project.civ.repositories.organigramme;

import ma.project.civ.entities.organigramme.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
}
