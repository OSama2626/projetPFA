package ma.project.civ.repositories;

import ma.project.civ.entities.Version;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VersionRepository extends JpaRepository<Version, Long> {
}
