package ma.project.civ.repositories.users;

import ma.project.civ.entities.users.Admin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {
    @Query("SELECT a FROM Admin a WHERE " +
            "(:matricule IS NULL OR LOWER(a.matricule) LIKE LOWER(CONCAT('%', :matricule, '%'))) AND " +
            "(:nom IS NULL OR LOWER(a.nom) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
            "(:prenom IS NULL OR LOWER(a.prenom) LIKE LOWER(CONCAT('%', :prenom, '%'))) AND " +
            "(:fonction IS NULL OR LOWER(a.fonction) LIKE LOWER(CONCAT('%', :fonction, '%')))")
    Page<Admin> searchAdmins(String matricule, String nom, String prenom, String fonction, Pageable pageable);
}
