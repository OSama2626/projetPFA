package ma.project.civ.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Data
public class CollaborateurDTO {
    private UUID id;
    private String nom;
    private String prenom;
    private String matricule;
    private Timestamp date_naissance;
    private String situation;
    private String gamme_train;
    private String fonction_sur_oracle;
    private String fonction_exercee;
    private String status;
    private Set<Long> siteProductionHabilitations;
    private Set<Long> ligneHabilitations;

    private UUID dateFiabiliteHumaineId;
    private Set<UUID> enginMoteurHabilitations;
    private UUID kn1Id;
    private UUID kn2Id;
    private UUID chef_service_planification_id;
    private UUID chef_etablissement_id;
}
