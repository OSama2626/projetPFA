package ma.project.civ.repositories.users;

import ma.project.civ.entities.users.UserApp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserAppRepository extends JpaRepository<UserApp, UUID> {
    Optional<UserApp> findByMatricule(String matricule);
}
