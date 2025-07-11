package ma.project.civ.entities.annexe5;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.Version;
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
public class PlaningTrimestrielControleRegulierKN1 {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "annee")
    private int annee;

    @Column(name = "trimestre")
    private String trimestre;

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private Etablissement etabissement;

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;

    @ManyToOne
    @JoinColumn(name = "Antenne_id")
    private Antenne Antenne;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Version> versions = new ArrayList<>();


    @OneToMany(cascade = CascadeType.ALL)
    private Set<CGPXTraction> cgpxTractions = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Set<CGPXFormation> cgpxFormations = new HashSet<>();






}
