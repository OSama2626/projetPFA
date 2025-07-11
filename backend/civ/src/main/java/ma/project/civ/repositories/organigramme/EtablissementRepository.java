package ma.project.civ.repositories.organigramme;

import ma.project.civ.entities.organigramme.Etablissement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtablissementRepository extends JpaRepository<Etablissement, Long> {
}
