package ma.project.civ.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ControleSurVif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int annee;
    private String trimestre;
    private String fonction;
    private String etablissement;
    private String centre;
    private String antenne;
    private String responsable;

    @OneToMany(mappedBy = "controleSurVif", cascade = CascadeType.ALL)
    private List<Procedure> procedures;

    @OneToMany(mappedBy = "controleSurVif", cascade = CascadeType.ALL)
    private List<ma.project.civ.entities.survif.PPOSSurVif> ppos;

    @OneToOne(mappedBy = "controleSurVif", cascade = CascadeType.ALL)
    private CheckListControle checkListControle;
}
