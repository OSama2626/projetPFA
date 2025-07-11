package ma.project.civ.entities.collaborateurs;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.annexe1.GroupeDuCapitalHumain;
import ma.project.civ.entities.engin_moteur.EnginMoteurHabilitation;
import ma.project.civ.entities.organigramme.Departement;
import ma.project.civ.entities.organigramme.LigneHabilitation;
import ma.project.civ.entities.organigramme.Service;
import ma.project.civ.entities.organigramme.SiteProductionHabilitation;
import ma.project.civ.entities.users.KN1;
import ma.project.civ.entities.users.KN2;
import ma.project.civ.entities.users.KN3;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Collaborateur {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "matricule", unique = true , nullable = false)
    private String matricule;

    @Column(name = "date_naissance")
    private Timestamp date_naissance;

    @Column(name = "situation", nullable = false)
    private String situation; //affecter ou detacher

    @Column(name = "gamme_train", nullable = false)
    private String gamme_train; //Gamme de train (pour CL)

    @Column(name = "Fonction_sur_oracle", nullable = false)
    private String fonction_sur_oracle;

    @Column(name = "Fonction_exercee", nullable = false)
    private String fonction_exercee;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "motif_status")
    private String motif_status;


    @ManyToMany
    @JoinTable(
            name = "collaborateur_site_production_habilitation",
            joinColumns = @JoinColumn(name = "collaborateur_id"),
            inverseJoinColumns = @JoinColumn(name = "site_production_habilitation_id")
    )
    private Set<SiteProductionHabilitation> siteProductionHabilitations = new HashSet<>();


    @ManyToMany
    @JoinTable(
            name = "collaborateur_ligne_habililation",
            joinColumns = @JoinColumn(name = "collaborateur_id"),
            inverseJoinColumns = @JoinColumn(name = "ligne_habililation_id")
    )
    private Set<LigneHabilitation> ligneHabilitations = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "departement_id")
    private Departement departement;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "date_fiabilite_humaine_id")
    private DateFiabiliteHumaine dateFiabiliteHumaine;

    //Engin moteur Habilitation...................


    @OneToMany(fetch = FetchType.EAGER)
    private Set<EnginMoteurHabilitation> enginMoteurHabilitations = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "kn1_id")
    private KN1 kn1;

    @ManyToOne
    @JoinColumn(name = "kn2_id")
    private KN2 kn2;

    @ManyToOne
    @JoinColumn(name = "chef_service_planification_id")
    private KN3 chef_service_planification;

    @ManyToOne
    @JoinColumn(name = "chef_etablissement_id")
    private KN3 chef_etablissement;

    @ManyToMany(mappedBy = "collaborateurs")
    private Set<GroupeDuCapitalHumain> groupeDuCapitalHumains=new HashSet<>();



}
