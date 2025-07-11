package ma.project.civ.entities.annexe1;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.Version;
import ma.project.civ.entities.collaborateurs.Collaborateur;
import ma.project.civ.entities.organigramme.Antenne;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.entities.organigramme.Etablissement;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupeDuCapitalHumain {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numero;

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private Etablissement etablissement;

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;

    @ManyToOne
    @JoinColumn(name = "antenne_id")
    private Antenne antenne;

    @ManyToMany
    @JoinTable(
            name = "collaborateur_groupe_capital_humain",
            joinColumns = @JoinColumn(name = "groupe_capital_humain_id"),
            inverseJoinColumns = @JoinColumn(name = "collaborateur_id")
    )
    private Set<Collaborateur> collaborateurs= new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    private List<Version> versions = new ArrayList<>();


}
