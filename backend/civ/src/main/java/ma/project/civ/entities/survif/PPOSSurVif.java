package ma.project.civ.entities.survif;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.ControleSurVif;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PPOSSurVif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numeroPPOS;
    private String typePPOS;
    private String designationPPOS;
    private String criteresControle;
    private int coefficient;

    @ManyToOne
    @JoinColumn(name = "controle_sur_vif_id")
    private ControleSurVif controleSurVif;
}
