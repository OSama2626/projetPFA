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
public class ControleAPriori {

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

    @OneToMany(mappedBy = "controleAPriori", cascade = CascadeType.ALL)
    private List<Procedure> procedures;

    @OneToOne(mappedBy = "controleAPriori", cascade = CascadeType.ALL)
    private CheckListControle checkListControle;
}
