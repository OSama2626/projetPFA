package ma.project.civ.entities.annexe3;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.Version;
import ma.project.civ.entities.annexe2.CheckListControleDOC;
import ma.project.civ.entities.annexe2.PR_SEF;
import ma.project.civ.entities.organigramme.Antenne;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.entities.users.KN3;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ControleVifKn1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "annee")
    private Integer annee;

    @Column(name = "fonction")
    private String fonction;

    @Column(name = "trimestre")
    private String trimestre;

    @Column(name = "note")
    private Double note;

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private Etablissement etabissement;

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;

    @ManyToOne
    @JoinColumn(name = "Antenne_id")
    private Antenne Antenne;

    @ManyToOne
    @JoinColumn(name = "kn3_id")
    private KN3 chef_service_PS;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Version> versions = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "pr_sef_id")
    private PR_SEF pr_sef;

    @OneToOne
    @JoinColumn(name = "check_List_Controle_DOC_id")
    private CheckListControleDOC checkListControleDOC;

    @OneToOne
    @JoinColumn(name = "ppos_sef_sst_id")
    private PPOS_SEF_SST ppos_sef_sst;




}
