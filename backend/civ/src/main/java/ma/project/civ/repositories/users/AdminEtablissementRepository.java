package ma.project.civ.repositories.users;

import ma.project.civ.entities.users.AdminEtablissement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface AdminEtablissementRepository extends JpaRepository<AdminEtablissement, UUID> {


//    @Query("SELECT a FROM AdminEtablissement a WHERE " +
//            "(:matricule IS NULL OR a.matricule LIKE CONCAT('%', :matricule, '%')) AND " +
//            "(:nom IS NULL OR a.nom LIKE CONCAT('%', :nom, '%')) AND " +
//            "(:prenom IS NULL OR a.prenom LIKE CONCAT('%', :prenom, '%')) AND " +
//            "(:fonction IS NULL OR a.fonction LIKE CONCAT('%', :fonction, '%'))")
//    Page<AdminEtablissement> searchAdmins(@Param("matricule") String matricule, @Param("nom")String nom, @Param("prenom") String prenom, @Param("fonction") String fonction, Pageable pageable);
@Query(value = "SELECT * FROM user_app WHERE " +
        "(?1 IS NULL OR matricule ILIKE '%' || ?1 || '%') AND " +
        "(?2 IS NULL OR nom ILIKE '%' || ?2 || '%') AND " +
        "(?3 IS NULL OR prenom ILIKE '%' || ?3 || '%') AND " +
        "(?4 IS NULL OR fonction ILIKE '%' || ?4 || '%') AND " +
        "user_type = 'ADMIN_ETABLISSEMENT'",
        countQuery = "SELECT COUNT(*) FROM user_app WHERE " +
                "(?1 IS NULL OR matricule ILIKE '%' || ?1 || '%') AND " +
                "(?2 IS NULL OR nom ILIKE '%' || ?2 || '%') AND " +
                "(?3 IS NULL OR prenom ILIKE '%' || ?3 || '%') AND " +
                "(?4 IS NULL OR fonction ILIKE '%' || ?4 || '%') AND " +
                "user_type = 'ADMIN_ETABLISSEMENT'",
        nativeQuery = true)
Page<AdminEtablissement> searchAdmins(String matricule, String nom, String prenom, String fonction, Pageable pageable);


}