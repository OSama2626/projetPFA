package ma.project.civ.repositories.organigramme;

import ma.project.civ.entities.organigramme.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
