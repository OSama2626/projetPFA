package ma.project.civ.entities.users;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.project.civ.entities.engin_moteur.EnginMoteurHabilitation;
import ma.project.civ.entities.organigramme.Antenne;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.entities.organigramme.Service;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("KN1")
public class KN1 extends UserApp{
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "service_kn1_id")
    private Service service;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "antenne_kn1_id")
    private Antenne antenne;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "centre_kn1_id")
    private Centre centre;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "etablissement_kn1_id")
    private Etablissement etablissement;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<EnginMoteurHabilitation> enginMoteurHabilitations = new HashSet<>();
}
//kn1 n'est pas intersser par la liste de serie mais juste le type de serie