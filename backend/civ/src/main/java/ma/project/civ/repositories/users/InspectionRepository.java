package ma.project.civ.repositories.users;

import ma.project.civ.entities.users.Inspection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InspectionRepository extends JpaRepository<Inspection, UUID> {
}
