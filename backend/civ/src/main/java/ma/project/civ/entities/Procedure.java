package ma.project.civ.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Procedure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numeroPR;
    private String designationPR;
    private String criteresControle;
    private int coefficient;

    @ManyToOne
    @JoinColumn(name = "controle_a_priori_id")
    private ControleAPriori controleAPriori;

    @ManyToOne
    @JoinColumn(name = "controle_sur_vif_id")
    private ControleSurVif controleSurVif;
}
